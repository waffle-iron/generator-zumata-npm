'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-whitelabel-custom-npm-package:app', function () {
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
      '.gitattributes',
      '.gitignore',
      '.npmignore',
      '.npmrc',
      'AUTHORS',
      'delete-directories.sh',
      'run-build.sh'
    ]);
  });
});
