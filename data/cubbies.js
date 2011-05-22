/*****************************************************************************
 * THIS SNIPPET: Copyright 2004 ThoughtWorks, Inc
 * Licensed under the Apache License, Version 2.0 */
 function absolutify(url,baseUrl){if(/^\w+:/.test(url)){return url}var loc;try{loc=parseUrl(baseUrl)}catch(e){if(/^\w:\\/.test(baseUrl)){baseUrl="file:///"+baseUrl.replace(/\\/g,"/");loc=parseUrl(baseUrl)}else{throw new SeleniumError("baseUrl wasn't absolute: "+baseUrl);}}loc.search=null;loc.hash=null;if(/^\//.test(url)){loc.pathname=url;var result=reassembleLocation(loc);return result}if(!loc.pathname){loc.pathname="/"+url;var result=reassembleLocation(loc);return result}if(/\/$/.test(loc.pathname)){loc.pathname+=url;var result=reassembleLocation(loc);return result}loc.pathname=loc.pathname.replace(/[^\/\\]+$/,url);var result=reassembleLocation(loc);return result}var URL_REGEX=/^((\w+):\/\/)(([^:]+):?([^@]+)?@)?([^\/\?:]*):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(.+)?/;function parseUrl(url){var fields=['url',null,'protocol',null,'username','password','host','port','pathname','search','hash'];var result=URL_REGEX.exec(url);if(!result){throw new SeleniumError("Invalid URL: "+url);}var loc=new Object();for(var i=0;i<fields.length;i++){var field=fields[i];if(field==null){continue}loc[field]=result[i]}return loc}function reassembleLocation(loc){if(!loc.protocol){throw new Error("Not a valid location object: "+o2s(loc));}var protocol=loc.protocol;protocol=protocol.replace(/:$/,"");var url=protocol+"://";if(loc.username){url+=loc.username;if(loc.password){url+=":"+loc.password}url+="@"}if(loc.host){url+=loc.host}if(loc.port){url+=":"+loc.port}if(loc.pathname){url+=loc.pathname}if(loc.search){url+="?"+loc.search}if(loc.hash){var hash=loc.hash;hash=loc.hash.replace(/^#/,"");url+="#"+hash}return url}
/*****************************************************************************/

var Cubbies = {
  server: 'cubbies.heroku.com',
  protocol: 'https',
  selectedClass: 'cubbies-selected',
  script: document.createElement('script'),
  stylesheet: document.createElement('style'),
  isInitialized: false,

  initialize: function(){
    Cubbies.appendCSS();
    Cubbies.wrapImages();
    Cubbies.isInitialized = true;

    $("img").live("click", function(evt){
      if(evt.shiftKey == 1){
        Cubbies.sendPhoto($(this));
        return false;
      }
    });
  },

  wrapImages: function(){
    $("img").live("mouseover", function(evt){
      element = $(this);
      Cubbies.imageSelected(element,evt);
    });

    $("img").live("mouseout", function(evt){
      $(this).removeClass(Cubbies.selectedClass);
      $(document).unbind("mousemove");
    });
  },

  imageSelected: function(element, evt){
    $(document).mousemove(function(evt){
      if(evt.shiftKey == 1){
        element.addClass(Cubbies.selectedClass);
      } else {
        element.removeClass(Cubbies.selectedClass);
      }
    });
  },

  sendPhoto: function(image){
    var currentPage = Cubbies.attributify(document.location, image),
        imageUrl = absolutify(image.attr('src'), currentPage);

    // this.script = document.createElement('script');
    Cubbies.script.type = 'text/javascript';
    Cubbies.script.src = Cubbies.protocol + "://" + Cubbies.server + "/add_photo.js?url=" + encodeURIComponent(imageUrl) + "&attribution=" + encodeURIComponent(currentPage) + "&height=" + image.height() + "&width=" + image.width();
    document.body.appendChild(Cubbies.script);
  },

  attributify: function(location, image){
    // special case tumblr's dashboard page to get a more correct attribution link
    if(location.host == "www.tumblr.com"){
      var parentLink = image.parent('a');
      if(parentLink.length > 0){
        return(parentLink.attr('href'));
      }
      return(location.href);
    }
    return(location.href);
  },

  appendCSS: function(){
    // var stylesheet = document.createElement('style');
    Cubbies.stylesheet.innerHTML = "" +
      "img, #cubbies-overlay{ -moz-transition-property: margin, box-shadow, z-index; -moz-transition-duration: 0.2s; }\n" +
      ".cubbies-selected{ z-index: 9999; box-shadow: 3px 3px 8px -1px blue !important; cursor: pointer !important; margin: -3px 3px 3px -3px; }\n" +
      ".cubbies-selected:active{ box-shadow: 2px 2px 5px -1px darkblue !important; margin: -1px 1px 1px -1px; }\n" +
      "#cubbies-overlay{ position: fixed; z-index: 9999; bottom: 30px; left: 30px; background-color: rgba(255,255,255,0.8); color: #111; border-radius: 3px; box-shadow: 0 2px 3px rgba(0,0,0,0.8); }\n" +
      "#cubbies-overlay:hover{ box-shadow: 0 2px 3px rgb(0,0,0); }"
    document.body.appendChild(Cubbies.stylesheet);
  },

  debug: function(str){
    try {
      console.log(str);
    } catch(e) { } 
  }
},
$window = $(window);

var active = false;

self.on('message',function onMessage(activation){
    active = activation;

    if(active){
        if($window.height() > 100 && $window.width() > 300){
            Cubbies.debug('Cubbi.es');

            if(!Cubbies.isInitialized)
                Cubbies.initialize();
        }        
    }else{
        if(Cubbies.isInitialized){
            try {
                // User disabled the Addon 
                document.body.removeChild(Cubbies.stylesheet);
                document.body.removeChild(Cubbies.script);   
            }catch(e){
                // Ignore if its not present in the dom
            }
            Cubbies.isInitialized = false;
        }
    }
});
