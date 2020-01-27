#!/usr/bin/env node

const inquirer = require('inquirer');
const colors = require('colors')
const showBanner = require('node-banner')
const program = require('commander')
const ora = require('ora')
const { CloneRepo, RenameFolder,InstallDepencies} = require('./index')
var questions = [
    {type:'list',name:'initRedux',message:colors.green('Do you want to install redux as well'),choices:['yes','no']},
]

const Setup = async () => {
    await showBanner('React-Redux-cli','Stupid Cli to automate your setup.')
    program
    .command('init')
    .alias('start')
    .description('Start')
    .action(function(){
        inquirer
            .prompt(questions)
            .then((answer) => {
                if(answer.initRedux){
                    // Install Redux 
                }
                var spinner = ora("Installing React").start()
                CloneRepo()
                .then(() => {
                    spinner.text="Installing dependencies"
                    spinner.spinner = "moon"
                    RenameFolder()
                    .then(()=> {
                        InstallDepencies()
                        .then(() => {
                            spinner.stop()
                            console.log(colors.blue("Succesfullly installed your React application \n"))
                        })
                    })
                    .catch((err) => {
                        console.error(err)
                        process.exit(1)
                    })
                })
                
                
                
            })

    })
    program.parse(process.argv);
}

module.exports = {
    Setup
}