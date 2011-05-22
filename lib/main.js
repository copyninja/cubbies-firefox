const widgets = require('widget');
const contextMenu = require('context-menu');
const data = require('self').data;
const pageMod = require('page-mod');


exports.main = function(options,callback){

    var pmod = pageMod.PageMod({
        include: ['*'],
        contentScriptWhen: 'end',
        contentScriptFile: [data.url('jquery-1.5.2.min.js'),
                            data.url('initialize.js')]
    });
    
    var menuItem = contextMenu.Item({
        label: "Save to Cubbi.es",
        context: contextMenu.SelectorContext("img"),
        contentScriptFile: [data.url('utils.js')]
    });
}