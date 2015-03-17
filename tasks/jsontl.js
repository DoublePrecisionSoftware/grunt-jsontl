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

	grunt.registerMultiTask('jsontl', 'Performing jsontl transformations', function() {

		var result,
				data,
				transform,
				createdFiles = 0;

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
			prettyPrint: grunt.option('prettyPrint') === true
    });

		if (!(this.data.transform && grunt.file.exists(this.data.transform))){
			grunt.fail.warn('Must provide a valid path to transform file.');
		}

		// get transform
		grunt.verbose.writeln('Found transform at ' + chalk.cyan(this.data.transform));
		transform = grunt.file.readJSON(this.data.transform);

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
				grunt.verbose.writeln('Found data at ' + chalk.cyan(src));
				data = grunt.file.readJSON(src);

				grunt.verbose.writeln('Executing transform...');
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

			grunt.verbose.writeln('writing transformed data at ' + chalk.cyan(f.dest));
			grunt.file.write(f.dest, JSON.stringify(result, undefined, options.prettyPrint ? 4 : undefined));

			grunt.verbose.writeln('File ' + chalk.cyan(f.dest) + ' created');
      createdFiles++;
		});
    grunt.log.ok(this.filesSrc.length  + ' ' + grunt.util.pluralize(this.filesSrc.length, 'file/files') + ' created.');
  });
};
