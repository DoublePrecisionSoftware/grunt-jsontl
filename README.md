grunt-contrib-jsontl
====================

Grunt task for performing [jsontl](http://github.com/DoublePrecisionSoftware/jsontl) transforms

## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-jsontl --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-jsontl');
```

## jsontl task
_Run this task with the `grunt jsontl` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide, with one notable exception.  In order to prevent ovewriting of files, the `expand` syntax is required.

```javascript
jsontl: {
	dev: {
		files: [{
			expand: true,
			src: ['data.old.json'],
			dest: 'my/dir',
			cwd: 'my/dir',
			ext: '.new.json'
		}],
		transform: 'my/dir/transform.jsontl',
		options: {
			prettyPrint: true
		}
	}
}
```

##Parameters
###transform
The `transform` parameter is required, and must be a string referring to a valid `.jsontl` file.

##Options
###prettyPrint
The `prettyPrint` option will format the JSON output with 4 space indentation.