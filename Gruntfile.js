'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({

		// Configuration to be run (and then tested).
		jsontl: {
			test: {
				files: [{
					expand: true,
					src: ['data.old.json'],
					dest: 'test/tmp',
					cwd: 'test/tmp',
					ext: '.new.json'
				}],
				transform: 'test/tmp/transform.jsontl',
				options: {
					prettyPrint: true
				}
			}
		},

		// Unit tests.
		mochaTest: {
			src: ['test/test.js'],
			options: {
				bail: true
			}
		},

		clean: {
			src: ['test/tmp/']
		}
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-internal');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-mocha-test');

	// Setup a test helper to create some folders to clean.
	grunt.registerTask('copy', 'Copy fixtures to a temp location.', function () {
		grunt.file.copy('test/fixtures/data.json', 'test/tmp/data.old.json');
		grunt.file.copy('test/fixtures/transform.jsontl', 'test/tmp/transform.jsontl');
	});

	// Whenever the 'test' task is run, first create some files to be transformed,
	// then run this plugin's task(s), then test the result.
	grunt.registerTask('test', ['copy', 'jsontl', 'mochaTest', 'clean']);

	// By default, run tranform, but don't clean up.
	grunt.registerTask('default', ['copy', 'jsontl', 'mochaTest']);
};
