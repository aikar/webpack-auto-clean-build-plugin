/*
 * Copyright (c) (2017) - Aikar
 *
 *  Written by Aikar <aikar@aikar.co>
 *    + Contributors (See AUTHORS)
 *
 *  http://aikar.co
 *  http://starlis.com
 *
 *  @license MIT
 *
 */

var fs = require("fs");
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
			for (var key of Object.keys(assetsByChunkName)) {
				var file = path.resolve(options.output.path, assetsByChunkName[key]);
				let prevFile = self.previousFiles[key];
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
