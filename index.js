var { spawn, spawnSync } = require('child_process');
var fs = require('fs');
var path = require('path');
const { reduxSnippet } = require('./snippets');
const { gitClone, reduxPlugins } = require('./values');
const CloneRepo = () => {
  return new Promise((resolve, reject) => {
    try {
      var child = spawnSync('git', ['clone', gitClone]);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
const addRedux = () => {
  return new Promise((resolve, reject) => {
    var child = spawn('npm', ['install', ...reduxPlugins]);
    child.stdout.on('error', (err) => {
      reject(err);
    });
    child.stdout.on('close', () => {
      resolve();
    });
  });
};

const deleteFolderRecursive = function (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const moveFile = (file, dir2, callback) => {
  var f = path.basename(file);
  var dest = path.resolve(dir2, f);
  fs.rename(file, dest, callback);
};

const updateRepoForRedux = () => {
  return new Promise((resolve, reject) => {
    //process.chdir(path.join(process.cwd(), process.argv[3]))
    var actionFile = fs.readFileSync('./redux-files/actions.js').toString();
    var reducerFile = fs.readFileSync('./redux-files/reducers.js').toString();
    process.chdir(path.join(process.cwd(), '/src'));
    fs.mkdir('store', () => {
      fs.writeFileSync(
        path.resolve(process.cwd(), './store/actions.js'),
        actionFile
      );
      fs.writeFileSync(
        path.resolve(process.cwd(), './store/reducers.js'),
        reducerFile
      );
      let filename = 'index.js';
      try {
        let content = fs
          .readFileSync(process.cwd() + '/' + filename)
          .toString();
        content = content.split('\n');
        content.splice(6, 0, reduxSnippet);
        fs.writeFileSync(process.cwd() + '/' + filename, content.join('\n'));
        deleteFolderRecursive(path.join(process.cwd(), '../redux-files'));
        resolve();
      } catch (e) {
        console.log(e);
        reject();
      }
    });
  });
};
const ReadFiles = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(process.cwd(), (err, filenames) => {
      if (err || filenames.indexOf('react-starter-boilerplate') === -1) {
        reject();
      } else {
        resolve();
      }
    });
  });
};

const RenameFolder = () => {
  return ReadFiles()
    .then(() => {
      return new Promise((resolve, reject) => {
        fs.rename('react-starter-boilerplate/', process.argv[3], (err) => {
          if (err) {
            reject();
          } else {
            resolve();
          }
        });
      });
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

const InstallDepencies = () => {
  return new Promise((resolve, reject) => {
    process.chdir(path.join(process.cwd(), process.argv[3]));
    var child = spawn('npm', ['install']);
    child.stdout.on('close', () => {
      resolve();
    });
  });
};

module.exports = {
  CloneRepo,
  RenameFolder,
  InstallDepencies,
  addRedux,
  updateRepoForRedux
};
