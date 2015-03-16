/*
 * grunt-contrib-jsontl
 * http://gruntjs.com/
 *
 * Copyright (c) 2015 Stephen Collins, contributors
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');
var jsontl = require('jsontl');

module.exports = function(grunt) {

	function transform(path, options) {
		if (!grunt.file.exists(path)){
			return false;
		}

	}


	grunt.registerMultiTask('jsontl', 'Perform jsontl transforms.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
			prettyPrint: grunt.option('prettyPrint') === true
    });

    // Transform specified files.
    this.filesSrc.forEach(function(filepath) {
      transform(filepath, options);
    });
    grunt.log.ok(this.filesSrc.length  + ' ' + grunt.util.pluralize(this.filesSrc.length, 'path/paths') + ' cleaned.');
  });
};
