'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the polished ' + chalk.red('generator-whitelabel-custom-npm-package') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'packageName',
      message: 'What would you like your package to be named?',
      default: () => {
        return process.cwd().replace(/(?:.*\/)(.+)/i, '$1');
      }
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    const TPLS = [
      'src/_index.js',
      '_package.json',
      '_PublisherDockerfile',
      '_README.md'
    ];

    this.fs.copyTpl(
      `${this.templatePath()}/**/{.*, !(_)*}`,
      this.destinationPath(),
      this.props
    );

    TPLS.map(tpl => {
      return this.fs.copyTpl(
        this.templatePath(tpl),
        this.destinationPath(tpl.replace(/(_)/gi, '')),
        this.props
      );
    });
  },

  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      yarn: false,
      callback: () => {
        console.log(`✨  Your custom NPM package ${chalk.green(this.props.packageName)} is ready! ✨`);
      }
    });
  }
});
