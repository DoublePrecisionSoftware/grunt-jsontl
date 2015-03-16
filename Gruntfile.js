'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Configuration to be run (and then tested).
    jsontl: {
      src: ['test/tmp/data_old.json'],
      dest: ['test/tmp/data_new.json'],
      transform: 'test/tmp/transform.jsontl'
    },

    // Unit tests.
    mochaTest: {
      src: ['test/test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-tests');

  // Setup a test helper to create some folders to clean.
  grunt.registerTask('copy', 'Copy fixtures to a temp location.', function() {
    grunt.file.copy('test/fixtures/data.json', 'tmp/data_old.json');
    grunt.file.copy('test/fixtures/transform.jsontl', 'tmp/transform.jsontl');
  });

  // Whenever the 'test' task is run, first create some files to be transformed,
  // then run this plugin's task(s), then test the result.
  grunt.registerTask('test', ['copy', 'mochaTest', 'clean']);

  // By default, and run all tests.
//  grunt.registerTask('default', ['test', 'build-contrib']);
  grunt.registerTask('default', ['copy', 'mochaTest', 'clean']);
};
