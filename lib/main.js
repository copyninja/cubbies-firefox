const widgets = require('widget');
const pageMod = require('page-mod');
const data = require('self').data

exports.main = function(){
    var widget = widgets.Widget({
        id: 'dummy-icon',
        label: 'cubbies-icon',
        contentURL: data.url('icon.png')        
    });
    
    var selector = pageMod.PageMod({
        include: ['*'],
        contentScriptWhen: 'ready',
        contentScriptFile: [data.url('jquery-1.5.2.min.js'),
                            data.url('htmlutils.js'),
                            data.url('cubbies.js')]
    });
}

