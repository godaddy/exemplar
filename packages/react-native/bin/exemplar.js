#!/usr/bin/env node
const findRoot = require('find-root');
const Liftoff = require('liftoff');
const v8flags = require('v8flags');
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');

// Set env var for ORIGINAL cwd
// before anything touches it
// eslint-disable-next-line no-process-env
const cwd = process.env.INIT_CWD = process.cwd();

const cli = new Liftoff({
  name: 'exemplar',
  processTitle: `exemplar native ${argv.cwd || cwd}`,
  moduleName: '@exemplar/react-native',
  v8flags: v8flags
});

// Make sure we have all our dependencies local, because react-native doesn't like non-local dependencies
/* eslint-disable no-sync */
function installLocal(modulePath) {
  const moduleDir = path.dirname(modulePath);
  if (fs.existsSync(path.join(moduleDir, 'node_modules', 'react-native'))) {
    return;
  }

  childProcess.execSync(
    'npm i react-native',
    {
      cwd: moduleDir,
      stdio: [null, process.stdout, process.stderr],
      timeout: 5 * 60 * 1000
    }
  );
}
/* eslint-enable no-sync */

// eslint-disable-next-line max-statements, complexity
cli.launch({ cwd: argv.cwd }, function (env) {
  if (!env.modulePath) {
    throw new Error('No local `@exemplar/react-native` module found!');
  }

  if (argv.android || argv.ios) {
    installLocal(env.modulePath);
  }

  const exemplar = require(env.modulePath);

  env.progress = 'progress' in argv ? argv.progress : true;
  env.target = argv.target;
  env.minify = argv.minify;
  env.componentType = argv.cardType;
  env.wrapperType = argv.wrapperType;
  env.files = argv._;
  env.platform = argv.ios && 'ios' || argv.android && 'android' || 'ios';
  env.simVersion = argv.simulator || 'iPhone XS';
  env.showKebab = argv.showKebab || true;
  env.host = argv.host || 'localhost';
  env.port = argv.port || 8080;
  env.sectionType = argv.sectionType || '';
  try {
    env.packagePath = findRoot(env.cwd);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Error finding package root for cwd: ${env.cwd}`);
    throw err;
  }
  env.props = argv.props ? require(path.join(cwd, argv.props)) : null;

  exemplar.start(env);
});

