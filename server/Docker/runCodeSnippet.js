var exec = require('child_process').exec;

function stopDocker(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('We ran the set timeout');
      exec(`docker kill "${name}"`, (err, stdout, stderr) => {
        if (err !== null) {
          reject(stderr);
        }
        resolve('Your code timed out!');
      });
    }, 10000);
  });
}
function runCodeSnippet(codeSnippet, name) {
  const cleanerCode = codeSnippet.replace(/["]/g, "'");
  stopDocker(name)
    .then(console.log)
    .catch(console.log);
  return new Promise((resolve, reject) => {
    exec(
      `docker run --rm --name "${name}" replicode:latest node evaluate.js "${cleanerCode}"`,
      function(err, stdout, stderr) {
        if (err !== null) {
          let errorOutput = stderr === '' ? 'Your code timed out!!!!' : stderr;
          reject(errorOutput);
        }
        console.log(stdout);
        resolve(stdout);
      }
    );
  });
}

module.exports = runCodeSnippet;
