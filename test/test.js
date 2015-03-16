/* Unit tests for jsont */

var assert = require('assert');
var fs = require('fs');
var exec = require('child_process').exec;
var execOptions = {
		cwd: path.join(__dirname, '..')
	};

describe('Task', function () {
	var data;
	before(function(done) {

		exec('grunt jsontl', execOptions, function(error, stdout) {
			fs.readFile('tmp/data_new.json', function(err, data) {
				data = JSON.parse(data);
				done();
			});
		});
	});

	it('should create data_new.json file', function(){
		assert(data);
	});

	it('should have performed transforms', function() {
		assert.equal(data.Value, "Two");
	});
});
