// @ts-check

'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  /**
   * Prompts the user for input.
   *
   * @returns {Promise} Promise to capture user's input.
   */
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('generator-zumata-npm') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'packageName',
      message: 'What would you like your package to be named?',
      /**
       * Package name. Defaults to current working directory.
       */
      default: () => {
        return process.cwd().replace(/(?:.*[/\\])([^/\\]+?)[/\\]*?$/gi, '$1');
      }
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  /**
   * Writing necessary files and folders to destination path.
   *
   */
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

  /**
   * Install necessary dependencies with selected package manager.
   *
   */
  install() {
    this.installDependencies({
      bower: false,
      npm: true,
      yarn: false,
      /**
       * Output message after installation succeeds.
       */
      callback: () => {
        console.log(`✨  Your NPM package ${chalk.green(this.props.packageName)} is ready! ✨`);
      }
    });
  }
};
