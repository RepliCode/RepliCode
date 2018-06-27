var exec = require('child_process').exec;

function runCodeSnippet(codeSnippet) {
  return new Promise((resolve, reject) => {
    exec(
      `cd Container && docker run test:latest /bin/sh && node server.js "${codeSnippet}"`,
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
