var exec = require('child_process').exec;
var path = require('path');
var filePath = path.join(__dirname, '/Container');

function runCodeSnippet(codeSnippet) {
  return new Promise((resolve, reject) => {
    exec(
      `cd ${filePath} && docker run test:latest /bin/sh && node evaluate.js "${codeSnippet}"`,
      function(err, stdout, stderr) {
        if (err !== null) {
          reject(err);
        }
        resolve(stdout);
      }
    );
  });
}

module.exports = runCodeSnippet;
