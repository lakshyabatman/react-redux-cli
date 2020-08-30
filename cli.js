#!/usr/bin/env node

const inquirer = require('inquirer');
const colors = require('colors');
const showBanner = require('node-banner');
const program = require('commander');
const ora = require('ora');
const fs = require('fs');
const {
  CloneRepo,
  RenameFolder,
  InstallDepencies,
  addRedux,
  updateRepoForRedux
} = require('./index');
var questions = [
  {
    type: 'list',
    name: 'initRedux',
    message: colors.green('Do you want to install redux as well'),
    choices: ['yes', 'no']
  }
];

const Setup = async () => {
  await showBanner('React-Redux-cli', 'Stupid Cli to automate your setup.');
  program
    .command('init')
    .alias('start')
    .description('Command to build react application on your machine.')
    .action(function () {
      inquirer.prompt(questions).then(async (answer) => {
        var spinner = ora('Installing React').start();
        try {
          let directories = fs.readdirSync(process.cwd());
          if (directories.indexOf(process.argv[3]) != -1)
            throw new Error('File already exist');
          await CloneRepo();
          spinner.text = 'Installing dependencies';
          spinner.spinner = 'moon';
          await RenameFolder();
          await InstallDepencies();
          spinner.stop();
          console.log(
            colors.blue('Succesfullly installed your React application \n')
          );
          if (answer.initRedux === 'yes') {
            spinner = ora('Installing Redux').start();
            spinner.spinner = 'monkey';
            await addRedux();
            await updateRepoForRedux();
            spinner.stop();
            console.log(colors.bgYellow('Installed Redux!'));
          }
        } catch (err) {
          console.log('\n');
          console.log(err.message);
          process.exit(1);
        }
      });
    });
  program.parse(process.argv);
};

module.exports = {
  Setup
};
