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


	grunt.registerMultiTask('jsontl', 'Performing jsontl transformations', function() {

		var result,
				data,
				transform;

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
			prettyPrint: grunt.option('prettyPrint')
    });

    // Transform specified files.
		this.files.forEach(function (f) {
      var src = f.src.filter(function (filepath) {
        // Warn on and remove invalid source files
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found.');
          return false;
        } else {
          return true;
        }
      });

      if (src.length === 0) {
        grunt.log.warn('Destination ' + chalk.cyan(f.dest) + ' not written because src files were empty.');
        return;
      }

			try {
				data = grunt.file.readJSON(src);
				transform = grunt.file.readJSON(this.transform);
        result = jsontl.transform(data, transform);
      } catch (e) {
        console.log(e);
        var err = new Error('Transform failed.');
        if (e.message) {
          err.message += '\n' + e.message + '. \n';
          if (e.line) {
            err.message += 'Line ' + e.line + ' in ' + src + '\n';
          }
        }
        err.origError = e;
        grunt.log.warn('Transformation of source ' + chalk.cyan(src) + ' failed.');
        grunt.fail.warn(err);
      }

			grunt.file.write(f.dest, result);

			grunt.verbose.writeln('File ' + chalk.cyan(f.dest) + ' created');
      createdFiles++;
		});
    grunt.log.ok(this.filesSrc.length  + ' ' + grunt.util.pluralize(this.filesSrc.length, 'path/paths') + ' cleaned.');
  });
};
