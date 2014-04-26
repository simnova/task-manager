#!/usr/bin/env node

var cordova_util = require('cordova/src/util');
var ConfigParser = require('cordova/src/ConfigParser')
var projectRoot = cordova_util.isCordova(process.cwd());
var projectXml = cordova_util.projectConfig(projectRoot);
var projectConfig = new ConfigParser(projectXml);
projectConfig.name();

/*
	BE SURE NODE_PATH is set with your node-modules directory.. i.e.:
	windows : C:\Users\<<username>>\AppData\Roaming\npm\node_modules
	osx : /usr/local/lib/node_modules (depends on how you have node installed)
*/

console.log("process.env.CORDOVA_VERSION: "+process.env.CORDOVA_VERSION);
console.log("process.env.CORDOVA_PLATFORMS: "+process.env.CORDOVA_PLATFORMS);
console.log("process.env.CORDOVA_PLUGINS: "+process.env.CORDOVA_PLUGINS);
console.log("process.env.CORDOVA_HOOK: "+process.env.CORDOVA_HOOK);
console.log("process.env.CORDOVA_CMDLINE: "+process.env.CORDOVA_CMDLINE);


var fs = require('fs');

var platformDir = {
    ios: {
        icon: "{$projectName}/Resources/icons",
        splash: "{$projectName}/Resources/splash",
        nameMap: {
            "icon-57.png": "icon.png",
            "icon-57-2x.png": "icon@2x.png",
            "icon-72-2x.png": "icon-72@2x.png",
            "screen-iphone-portrait.png": "Default~iphone.png",
            "screen-iphone-portrait-2x.png": "Default@2x~iphone.png",
            "screen-iphone-portrait-568h-2x.png": "Default-568h@2x~iphone.png"
        }
    },
    android: {
        icon: "res/drawable-{$density}",
        splash: "res/drawable-{$density}",
        nameMap: {
            "icon-36-ldpi.png": "icon.png",
            "icon-48-mdpi.png": "icon.png",
            "icon-72-hdpi.png": "icon.png",
            "icon-96-xhdpi.png": "icon.png",
            "screen-ldpi-portrait.png": "ic_launcher.png",
            "screen-mdpi-portrait.png": "ic_launcher.png",
            "screen-hdpi-portrait.png": "ic_launcher.png",
            "screen-xhdpi-portrait.png": "ic_launcher.png"
        }
    },
    blackberry10: {},
    wp7: {},
    wp8: {
				icon: ".",
        splash: ".",
        nameMap: {
            "icon-62-tile.png": "ApplicationIcon.png",
            "icon-173-tile.png": "Background.png"
        }

    }
}

    function copyAsset(scope, node) {
        var platform = node.attrib['gap:platform'];
        var density = node.attrib['gap:density'];
        var assetDirTmpl = platformDir[platform] && platformDir[platform][scope];

        if (!assetDirTmpl)
            return;

        var dict = {
            projectName: projectConfig.name(),
            density: density
        };

        var assetDir = assetDirTmpl.replace(/{\$([^}]+)}/, function(match, p1) {
            return dict[p1];
        });

        var srcPath = 'www/' + node.attrib.src;
        var fileName = srcPath.match(/[^\/]+$/)[0];
        if (platformDir[platform] && platformDir[platform].nameMap && platformDir[platform].nameMap[fileName]) {
            fileName = platformDir[platform].nameMap[fileName];
        }
        var dstPath = 'platforms/' + platform + '/' + assetDir + '/' + fileName;

        console.log('copying from ' + srcPath + ' to the ' + dstPath);
        // so, here we start to copy asset
        fs.stat(srcPath, function(err, stats) {
            if (err) {
            		console.log('error:' + err);
                return;
            }
            var r = fs.createReadStream(srcPath);
            r.on('open', function() {
                r.pause();
                var w = fs.createWriteStream(dstPath);
                w.on('open', function() {
                    r.pipe(w);
                    r.resume();
                });
                w.on('error', function() {
                    console.log('Cannot write file');
                })
            });
            r.on('error', function() {
                console.log('Cannot read file');
            })
        })
    }

projectConfig.doc.findall('icon').map(function(node) {
    copyAsset('icon', node);
});

projectConfig.doc.findall('*').filter(function(node) {
    if (node.tag == 'gap:splash') return true;
}).map(function(node) {
    copyAsset('splash', node);
});