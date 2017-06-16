// @ts-check

'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('generator-zumata-npm') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'packageName',
      message: 'What would you like your package to be named?',
      default: () => {
        return process.cwd().replace(/(?:.*[/\\])([^/\\]+?)[/\\]*?$/gi, '$1');
      }
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const TPLS = [
      'src/_index.js',
      '_package.json',
      '_PublisherDockerfile',
      '_README.md',
      '_.eslintrc.json',
      '_.gitignore',
      '_.npmrc'
    ];
    const RAW_GLOB_PATTERNS = [
      '{.,!(_)}*'
    ];

    RAW_GLOB_PATTERNS.map(rawGlobPattern => this.fs.copy(
      `${this.templatePath()}/**/${rawGlobPattern}`,
      this.destinationPath()
    ));

    TPLS.map(tpl => this.fs.copyTpl(
      this.templatePath(tpl),
      this.destinationPath(tpl.replace(/(_)/gi, '')),
      this.props
    ));
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: true,
      yarn: false,
      callback: () => {
        console.log(`✨  Your NPM package ${chalk.green(this.props.packageName)} is ready! ✨`);
      }
    });
  }
};
