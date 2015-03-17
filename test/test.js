/* jshint mocha: true */

var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('Task', function () {
	var testData;
	before(function (done) {

		fs.readFile(path.join(__dirname, 'tmp/data.new.json'), function (err, data) {
			if (err) {
				assert.ifError(err);
				done();
			}

			testData = JSON.parse(data);

			assert(testData, 'transform not executed');

			done();
		});
	});

	it('should have performed transforms', function () {
		assert.equal(testData.Value, "Two");
	});
});
