const contextMenu = require('context-menu');
const data = require('self').data;
const pageMod = require('page-mod');


exports.main = function(options,callback){

    // Load old shift key and other CSS for saved notification
    var pmod = pageMod.PageMod({
        include: ['*'],
        contentScriptWhen: 'end',
        contentScriptFile: [data.url('jquery-1.5.2.min.js'),
                            data.url('initialize.js')]
    });

    // Right clicking on image shows up a new menu item for Saving to cubbi.es
    var menuItem = contextMenu.Item({
        label: "Save to Cubbi.es",
        context: contextMenu.SelectorContext("img"),
        contentScriptFile: [data.url('utils.js')]
    });
}