'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const name = 'test-project';
const description = 'description of test project';
const username = 'alanturing';
const fullname = 'Alan Turing';

describe('generator-npm-typescript-starter:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ name, description, username, fullname });
  });

  it('creates files', () => {
    assert.file([
      'LICENSE',
      'package.json',
      'README.md',
      '.gitignore',
      '.nycrc',
      'index.ts',
      'mocha.opts',
      'tsconfig.json',
      'tslint.json',
      'lib/index.ts',
      'test/index.spec.ts',
      '.vscode/settings.json'
    ]);
  });
});
