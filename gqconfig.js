/**
 * Created by happy on 3/4/17.
 */
var _ = require('lodash');
require('require-ini');

function config(o) {
    o = o || {};
    o.configFile = o.configFile || (process.cwd() + "/config.ini");
    o.defaultConfigFile = o.defaultConfigFile || (process.cwd() + "/default.config.ini");
    o.customConfig = require(o.configFile);
    o.defaultConfig = require(o.defaultConfigFile);
    o.config = global.config = _.merge(_.cloneDeep(o.defaultConfig), _.cloneDeep(o.customConfig));
    return o;
}

module.exports = config;