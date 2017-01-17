# webpack-auto-clean-build-plugin
Automatically remove old assets after each build in webpack watch mode

If you use webpack in watch mode (not dev server), and use hashes in your output file name, then your build folder will quickly rack up versions of every one of your output files.

This plugin makes it so that when a new chunk is generated with a different file name, the previous file name is auto removed.

This makes your project behave very closely to webpack-dev-server, but with writing files to disk, which is much friendlier when used with other web servers.

## Does not handle initial clean

This plugin does not handle the initial clean. You should still use something like [CleanWebpackPlugin](https://github.com/johnagan/clean-webpack-plugin) for that.


## Setup

```javascript
var AutoCleanBuildPlugin = require('webpack-auto-clean-build-plugin');
```

then in 

```javascript
plugins: [ new AutoCleanBuildPlugin() ]
```
