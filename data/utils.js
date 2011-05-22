/*****************************************************************************
 * THIS SNIPPET: Copyright 2004 ThoughtWorks, Inc
 * Licensed under the Apache License, Version 2.0 */
 function absolutify(url,baseUrl){if(/^\w+:/.test(url)){return url}var loc;try{loc=parseUrl(baseUrl)}catch(e){if(/^\w:\\/.test(baseUrl)){baseUrl="file:///"+baseUrl.replace(/\\/g,"/");loc=parseUrl(baseUrl)}else{throw new SeleniumError("baseUrl wasn't absolute: "+baseUrl);}}loc.search=null;loc.hash=null;if(/^\//.test(url)){loc.pathname=url;var result=reassembleLocation(loc);return result}if(!loc.pathname){loc.pathname="/"+url;var result=reassembleLocation(loc);return result}if(/\/$/.test(loc.pathname)){loc.pathname+=url;var result=reassembleLocation(loc);return result}loc.pathname=loc.pathname.replace(/[^\/\\]+$/,url);var result=reassembleLocation(loc);return result}var URL_REGEX=/^((\w+):\/\/)(([^:]+):?([^@]+)?@)?([^\/\?:]*):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(.+)?/;function parseUrl(url){var fields=['url',null,'protocol',null,'username','password','host','port','pathname','search','hash'];var result=URL_REGEX.exec(url);if(!result){throw new SeleniumError("Invalid URL: "+url);}var loc=new Object();for(var i=0;i<fields.length;i++){var field=fields[i];if(field==null){continue}loc[field]=result[i]}return loc}function reassembleLocation(loc){if(!loc.protocol){throw new Error("Not a valid location object: "+o2s(loc));}var protocol=loc.protocol;protocol=protocol.replace(/:$/,"");var url=protocol+"://";if(loc.username){url+=loc.username;if(loc.password){url+=":"+loc.password}url+="@"}if(loc.host){url+=loc.host}if(loc.port){url+=":"+loc.port}if(loc.pathname){url+=loc.pathname}if(loc.search){url+="?"+loc.search}if(loc.hash){var hash=loc.hash;hash=loc.hash.replace(/^#/,"");url+="#"+hash}return url}
/*****************************************************************************/


function attributify(location,image){
    if(location.host == "www.tumblr.com"){
        var parentLink = image.parent('a');
        if(parentLink.length > 0){
            return (parentLink.attr('href'));
        }

        return location.href;
    }

    return location.href;
}

self.on("click",function(image){
    var currentPage = attributify(location.href, image);
    var imageUrl = absolutify(image.src,currentPage);

    this.script = document.createElement('script');
    this.script.src = "https://cubbies.heroku.com/add_photo.js?url=" + encodeURIComponent(imageUrl) + "&attribution=" + encodeURIComponent(currentPage) + "&height=" + image.height + "&width=" + image.width;

    document.body.appendChild(this.script);
    
});