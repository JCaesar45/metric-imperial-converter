const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

const mocha = new Mocha({
  timeout: 5000,
  reporter: 'json'
});

const testDir = './tests'

// Add each .js file to the mocha instance
fs.readdirSync(testDir)
  .filter(function(file) {
    // Only keep the .js files
    return file.substr(-3) === '.js';
  })
  .forEach(function(file) {
    mocha.addFile(
      path.join(testDir, file)
    );
  });

module.exports.run = function(testFilter = []) {
  return new Promise((resolve, reject) => {
    try {
      // Run the tests.
      let failCnt = 0;
      let passCnt = 0;
      let res = [];
      mocha.suite.emit('pre-require', global, 'solution', mocha);

      const runner = mocha.run(function(failures) {
        // process.exitCode = failures ? 1 : 0;  // exit with non-zero status if there were failures
      });

      runner.on('pass', function(test) {
        passCnt++;
        res.push({title: test.title, status: 'passed'});
      });

      runner.on('fail', function(test, err) {
        failCnt++;
        res.push({
          title: test.title,
          status: 'failed',
          error: err.message
        });
      });

      runner.on('end', function() {
        const total = passCnt + failCnt;
        const ret = {
          stats: {
            tests: total,
            passes: passCnt,
            failures: failCnt
          },
          results: res
        };
        console.log(JSON.stringify(ret, null, 2));
        resolve(ret);
      });
    } catch (err) {
      console.log('Error in test-runner:', err);
      reject(err);
    }
  });
};
