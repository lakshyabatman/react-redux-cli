var {spawn} = require('child_process')
var fs = require('fs')
var path = require('path')
const {gitClone,reduxPlugins,fileNames} = require('./values')
const CloneRepo = () =>{
    return new Promise((resolve,reject) => {
        var child = spawn('git', ["clone", gitClone])
        child.stdout.on("close",() => {
            resolve()
        })
    })
}
const addRedux = () => {
    return new Promise((resolve,reject) => { 
        var child = spawn("npm",["install",...reduxPlugins])
        child.stdout.on("error" ,(err) => {
            reject(err)
        })
        child.stdout.on("close",() => {
            resolve()
        })
    })
}

const updateRepoForRedux = () => {
    return new Promise((resolve,reject) => {

        process.chdir(path.join(__dirname , process.argv[3],'/src/'))
        fs.mkdir("store",()=> {
            process.chdir(path.join(process.cwd(),"store"))
            fs.writeFile("actions.js","",function(err,data) {
                fs.writeFile("reducers.js","",function(err,data){
                    resolve()
                })
            })
        })
    })
}
const ReadFiles = () => {
    return new Promise((resolve,reject) => {
        fs.readdir(__dirname,(err,filenames)=>{
            if(err || filenames.indexOf('react-starter-boilerplate')===-1) {
                reject()
            }else {
                resolve()
            }
        })

    })
}

const RenameFolder = () =>{
    return ReadFiles()
    .then(() => {
        return new Promise((resolve,reject) => {
            fs.rename('react-starter-boilerplate/',process.argv[3],(err) => {
                if(err) {
                    reject()
                }else {
                    resolve()
                }
            })
        })    
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })

}

const InstallDepencies = () => {
    return new Promise((resolve,reject) => {
        process.chdir(path.join(__dirname , process.argv[3]))
        var child = spawn('npm', ["install"])
        
        // child.stdout.on("data", (data) => {
        // })
        child.stdout.on("close",() =>{
            resolve()
        })

    })
}

module.exports = {
    CloneRepo,
    RenameFolder,
    InstallDepencies,
    addRedux,
    updateRepoForRedux
}