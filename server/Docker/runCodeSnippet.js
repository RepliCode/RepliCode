var exec = require('child_process').exec;
var path = require('path');

function runCodeSnippet(codeSnippet) {
  return new Promise((resolve, reject) => {
    exec(`docker run replicode:latest node evaluate.js "${codeSnippet}"`, function(
      err,
      stdout,
      stderr
    ) {
      if (err !== null) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}
module.exports = runCodeSnippet;
