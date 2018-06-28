var exec = require('child_process').exec;

function runCodeSnippet(codeSnippet) {
  return new Promise((resolve, reject) => {
    exec(
      `docker run replicode:latest node evaluate.js "${codeSnippet}"`,
      { timeout: 5000 },
      function(err, stdout, stderr) {
        if (err !== null) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
}
module.exports = runCodeSnippet;
