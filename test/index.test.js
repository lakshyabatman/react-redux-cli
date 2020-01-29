const { CloneRepo, RenameFolder,InstallDepencies,addRedux,updateRepoForRedux} = require('.././index')
updateRepoForRedux()
.then(()=>{
    console.log("Success")
})