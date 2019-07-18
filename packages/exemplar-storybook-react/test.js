const path = require('path');
const rimraf = require('rimraf');
const assume = require('assume');
const { spawn } = require('child_process');

const outDir = path.join(__dirname, '.testout');

function assumeBuildStorybook(config) {
  return done => {
    const storybook = spawn('build-storybook', [
      '-c', config,
      '-o', './.testout'
    ]);

    storybook.stdout.pipe(process.stdout);
    storybook.stderr.pipe(process.stderr);

    storybook.once('error', done);
    storybook.on('exit', code => {
      assume(code).equals(0);
      done();
    });
  };
}

describe('@exemplar/storybook-react', function () {
  this.timeout(60 * 1000);

  beforeEach(done => {
    rimraf(outDir, done.bind(null, null));
  });

  it('build-storybook -c ./ should work correctly', assumeBuildStorybook('./'));
  it('build-storybook -c ./.storybook should work correctly', assumeBuildStorybook('./.storybook'));
});
