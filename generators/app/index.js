'use strict';

const path = require('path');

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const fullnamePromise = require('fullname')();
const username = require('git-user-name')();

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
  }

  async prompting() {
    const fullname = await fullnamePromise;

    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    }, {
      type: 'input',
      name: 'description',
      message: 'Your project description'
    }, {
      type: 'input',
      name: 'username',
      message: 'Your git user name',
      default: username
    }, {
      type: 'input',
      name: 'fullname',
      message: 'Your full name',
      default: fullname
    }]).then((answers) => {
      this.props = answers;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_LICENSE'),
      this.destinationPath('LICENSE'), {
        fullname: this.props.fullname,
        year: new Date().getFullYear()
      }
    );

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'), {
        name: this.props.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        appname: this.destinationPath().split(path.sep).pop(),
        description: this.props.description,
        username: this.props.username
      }
    );

    this.fs.copy(
      this.templatePath('.vscode'),
      this.destinationPath('.vscode')
    );

    this.fs.copy(
      this.templatePath('lib'),
      this.destinationPath('lib')
    );

    this.fs.copy(
      this.templatePath('test'),
      this.destinationPath('test')
    );

    this.fs.copy(
      this.templatePath('index.ts'),
      this.destinationPath('index.ts')
    );

    this.fs.copy(
      this.templatePath('mocha.opts'),
      this.destinationPath('mocha.opts')
    );

    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );

    this.fs.copy(
      this.templatePath('tslint.json'),
      this.destinationPath('tslint.json')
    );

    this.fs.copy(
      this.templatePath('.nycrc'),
      this.destinationPath('.nycrc')
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
  }

  installing() {
    this.npmInstall();
  }
}
