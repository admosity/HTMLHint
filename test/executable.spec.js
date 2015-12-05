/* jshint -W079 */
var expect = require('expect.js');

var ChildProcess = require('child_process');
var path = require('path');

describe('Executable', function () {
  it('should close stream before exit', function (done) {
    var c = ChildProcess.spawn(path.resolve(__dirname+'/../bin/htmlhint'), ['--format', 'json', path.resolve(__dirname+'/test.html')]);
    var stdoutEnd = false;
    var processEnd = false;
    var isDone = 0;

    function checkDone() {
      isDone++;
      if (isDone == 2) {
        done();
      }
    }

    c.stdout.on('data', function() {
      expect(stdoutEnd || processEnd).to.be(false);
    });

    c.stdout.on('close', function() {
      stdoutEnd = true;
      expect(processEnd).to.be(false);
      checkDone();
    });

    c.on('exit', function() {
      processEnd = true;
      expect(stdoutEnd).to.be(true);
      checkDone();
    });

  });
});
