/*
 * Copyright (c) (2017) - Aikar
 *
 *  http://aikar.co
 *
 *  @license MIT
 *
 */

var fs = require("fs");
var path = require("path");
function WebpackAutoCleanBuildPlugin (path) {}

WebpackAutoCleanBuildPlugin.prototype = {
	previousFiles: {},
	varructor: WebpackAutoCleanBuildPlugin,

	apply: function (compiler) {
		var self = this;
		compiler.plugin('after-emit', function (compilation, callback) {
			var options = compiler.options;
			var stats = compilation.getStats().toJson({
				hash: true,
				publicPath: true,
				assets: true,
				chunks: false,
				modules: false,
				source: false,
				errorDetails: false,
				timings: false
			});

			var assetsByChunkName = stats.assetsByChunkName;
			var keys = Object.keys(assetsByChunkName);
			for (var key in keys) {
				if (!keys.hasOwnProperty(key)) continue;
				key = keys[key];
				var fileName = assetsByChunkName[key];
				if (Array.isArray(fileName)) {
					fileName = assetsByChunkName[key][0];
				}
				var file = path.resolve(options.output.path, fileName);
				var prevFile = self.previousFiles[key];
				if (prevFile && prevFile != file) {
					fs.unlink(prevFile);
				}
				self.previousFiles[key] = file;
			}

			callback();
		});
	}
};

module.exports = WebpackAutoCleanBuildPlugin;
