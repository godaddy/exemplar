/* eslint-disable no-process-env */
const { spawn } = require('child_process');
const handlebars = require('handlebars');
const async = require('async');
const path = require('path');
const tmp = require('tmp');
const fs = require('fs');
const readline = require('readline');

//
// Default locations of the tools that we need to spawn.
//
const cwd = path.join(__dirname, '..', '..');

/**
 * Orchestrate react-native cli and it's simulators.
 *
 * @public
 */
class ExemplarNative {
  constructor(env) {
    this.env = env;
    this.children = new Map();

    this.clean();
  }

  /**
   * Clean up, calls `destroy`.
   *
   * @private
   */
  clean() {
    const self = this;

    function destroy(error) {
      self.destroy(function stopped() {
        if (error) console.error(error);
        console.log('@exemplar/react-native cleaned up and stopped!');

        // eslint-disable-next-line no-process-exit
        process.exit(error && 1);
      });
    }

    readline.createInterface({
      input: process.stdin,
      output: process.stdout
    }).once('SIGINT', destroy);

    process.once('uncaughtException', destroy);
  }

  /**
   * Generates the files needed to run the react-native application.  Including:
   *  1. The application entry point
   *  2. The webpack configuration
   *
   * @param {Function} done Completion callback
   * @public
   */
  generate(done) {
    const storiesPath = path.resolve(this.env.packagePath, 'stories');

    fs.readFile(path.join(__dirname, 'app.js'), 'utf-8', (appReadError, content) => {
      if (appReadError) {
        done(appReadError);
        return;
      }

      content = handlebars.compile(content)({
        targetFile: this.env.config
      });

      //
      // Create a temporary directory and write the generated handlebar template to file.
      //
      tmp.dir({
        template: path.join(__dirname, '.exemplar-XXXXXX'),
        unsafeCleanup: true
      }, (dirError, root, remove) => {
        if (dirError) {
          done(dirError);
          return;
        }

        this.root = root;
        this.remove = remove;
        this.exemplarAppPath = `${this.root}/index.native.js`;

        const configContent = `module.exports = ({ platform }, defaults) => ({
          entry: '${this.exemplarAppPath}',
          resolve: {
            ...defaults.resolve,
            alias: {
              ...defaults.resolve.alias
            }
          },
          module: {
            ...defaults.module,
            rules: [{
              test: /.js$/,
              exclude: /node_modules\\/(?!@ux|@gx).*\\/node_modules/,
              use: {
                loader: require.resolve('babel-loader')
              },
            }, ...defaults.module.rules]
          }
        });`;

        async.parallel([
          fs.writeFile.bind(fs, path.join(root, 'storybook.config.js'), configContent),
          fs.writeFile.bind(fs, path.join(root, 'index.native.js'), content)
        ], function (writeError) {
          done(writeError);
        });
      });
    });
  }

  /**
   * Start the react-native packager.
   *
   * @param {Function} done Completion callback.
   * @public
   */
  packer(done) {
    //
    // TODO: Run packager programmatically, some issues exist around resolving the `ProvidesModule` modules of
    // React Native. DX might improve once `metro-bundle` has become mainstream.
    //
    // The ordering of `projectRoots` is important as RN will pickup on the first `index.[platform].js` that
    // is found. This should always be our temporary wrapper.
    //
    console.log('====================================');
    console.log(`running packer from ${cwd}`);
    console.log(`app path is: ${this.exemplarAppPath}`);
    console.log('====================================');

    const args = [
      'mockHaul',
      'start',
      '--config',
      path.join(this.root, 'storybook.config.js'),
      '--platform',
      this.env.platform
    ];

    console.log(`spawn: npx ${args.join(' ')}`);
    this.children.set('packer', spawn('npx', args, {
      env: Object.assign({}, process.env, { NODE_ENV: 'test' })
    }));

    const packer = this.children.get('packer');
    packer.stderr.on('data', data => {
      data = data.toString('utf-8').trim();
      console.error(`packer err: ${data}`);

      if (~data.indexOf('[BABEL] Note:') || ~data.indexOf('Warning')) {
        return;
      }

      this.children.delete('packer');
      packer.kill();
    });

    packer.stdout.on('data', data => {
      console.log(data.toString('utf-8').trim());
    });

    packer.stdout.once('data', () => {
      done();
    });
  }

  /**
   * Start react-native.
   *
   * @param {Function} done Completion callback.
   * @public
   */
  simulator(done) {
    this.children.set('simulator', spawn('react-native', [
      `run-${this.env.platform}`,
      '--simulator',
      this.env.simVersion,
      '--project-path',                                     // required for deduped react-native.
      'node_modules/@exemplar/packages/react-native/ios'    // this only works for iOS, Android has different arg.
    ], {
      env: process.env
    }));

    const simulator = this.children.get('simulator');

    simulator.stderr.on('data', (data) => {
      console.error(data.toString('utf-8').trim());

      // Explicitly not doing these, simulator seems to spew errors for all sorts of things that aren't actually errors
      // Like havig an iphone connected that you aren't deploying to, the simulator already running, etc.
      // this.children.delete('simulator');
      // simulator.kill();
    });

    simulator.stdout.on('data', (data) => {
      console.log(data.toString('utf-8').trim());
    });

    simulator.once('close', () => {
      this.children.delete('simulator');
      done();
    });
  }

  /**
   * Setup all react-native packagers and simulators.
   *
   * 1. Find the package.json and the corresponding Schema and generate fake data.
   * 2. Write boilerplate file that adhers to platform and wraps requires Card.
   * 3. Ensure the packager starts with required `projectRoots` and `entryFile`.
   * 4. Ensure the native build starts from the `process.cwd()`
   * 5. Indicate success to the user.
   *
   * @param {Function} done Error first completion callback.
   * @returns {object} The current instance.
   * @public
   */
  start(done) {
    async.waterfall([
      this.generate.bind(this),
      this.packer.bind(this),
      this.simulator.bind(this)
    ], done);

    return this;
  }

  /**
   * Destroy and close all active processes.
   *
   * @param {Function} done Error first completion callback.
   * @public
   */
  destroy(done) {
    const children = this.children;
    let i = 0;

    if (this.remove) {
      this.remove();
    }

    if (!children.size) {
      done();
      return;
    }

    const onClose = () => {
      if (++i < children.size) return;

      done();
    };
    for (const [, child] of children) {
      child.once('close', onClose).kill();
    }
  }
}

module.exports = ExemplarNative;
