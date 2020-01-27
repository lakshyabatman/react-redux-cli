var {spawn} = require('child_process')
var fs = require('fs')
var path = require('path')

var gitClone ="https://github.com/lakshyabatman/react-starter-boilerplate.git"

const CloneRepo = () =>{
    return new Promise((resolve,reject) => {
        var child = spawn('git', ["clone", gitClone])
        child.stdout.on("close",() => {
            resolve()
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
        process.chdir(path.join("./" , process.argv[3]))
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
    InstallDepencies
}