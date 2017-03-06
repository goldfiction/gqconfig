/**
 * Created by happy on 3/4/17.
 */
var _ = require('lodash');
var ini = require('ini');
var fs = require('fs');

//----------------- main
function config(o) {
    o = o || {};

    o.configFile = o.configFile || (process.cwd() + "/config.ini");
    o.defaultConfigFile = o.defaultConfigFile || (process.cwd() + "/default.config.ini");

    try {
        o.customConfig = ini.parse(fs.readFileSync(o.configFile, 'utf-8'));
    } catch (e) {
        o.customConfig = {};
    }
    try {
        o.defaultConfig = ini.parse(fs.readFileSync(o.defaultConfigFile, 'utf-8'));
    } catch (e) {
        o.defaultConfig = {};
    }

    o.config = _.merge(_.cloneDeep(o.defaultConfig), _.cloneDeep(o.customConfig));
    o.config = doParse(o.config);
    global.config = o.config;

    return o;
}

module.exports = config;

//----------------------- libz

function doParse(obj) {
    try {
        if (typeof obj === 'string' || obj instanceof String) {
            obj = JSON.parse(obj);
        }
    } catch (e) {
    }

    if (typeof obj === 'object') {
        for (var i in obj) {
            if (typeof obj[i] === 'string' || obj[i] instanceof String || obj[i] instanceof Object) {
                obj[i] = doParse(obj[i]);
            }
        }
    }
    return obj;
}