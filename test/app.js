// @ts-check

'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-zumata-npm:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        packageName: `${process.cwd().replace(/(?:.*\/)(.+)/i, '$1')}`
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'src/index.js',
      'package.json',
      'PublisherDockerfile',
      'README.md',
      '.babelrc',
      '.dockerignore',
      '.editorconfig',
      '.eslintignore',
      '.eslintrc.json',
      '.gitattributes',
      '.gitignore',
      '.npmignore',
      '.npmrc',
      'AUTHORS',
      'LICENSE',
      'clean-directories.sh',
      'run-build.sh'
    ]);
  });
});
