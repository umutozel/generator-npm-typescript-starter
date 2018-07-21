'use strict';

const yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    const done = this.async();

    this.prompt({
      type: 'input',
      name: 'name',
      message: 'project name',
      default: this.appname
    }, function (answers) {
      this.props = answers;
      this.log(answers.name);
      done();
    }).bind(this);
  }
});
