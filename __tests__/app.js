// @ts-check

'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-zumata-npm:app', () => {
  beforeAll(() => helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({
      packageName: `${process.cwd().replace(/(?:.*\/)(.+)/i, '$1')}`
    })
    .toPromise());

  it('creates files', function () {
    assert.file([
      'src/index.js',
      '.eslintrc.json',
      '.gitignore',
      '.npmrc',
      'package.json',
      'PublisherDockerfile',
      'README.md',
      '.babelrc',
      '.dockerignore',
      '.editorconfig',
      '.eslintignore',
      '.gitattributes',
      '.npmignore',
      'clean-directories.sh',
      'CONTRIBUTORS',
      'LICENSE',
      'run-build.sh'
    ]);
  });
});
