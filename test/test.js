/**
 * Created by happy on 3/4/17.
 */
var loadConfig=require('../gqconfig.js');
var assert=require('assert');
var cfg=null;

it("should be able to load config",function(done){
    setTimeout(function(){
        cfg=loadConfig({
            configFile:process.cwd()+"/test/config.ini",
            defaultConfigFile:process.cwd()+"/test/default.config.ini"
        });
        console.log(cfg);
        assert(global.config.general.c===5);
        done();
    },10)
});


