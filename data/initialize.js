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
},
$window = $(window);

if($window.height() > 100 && $window.width() > 300){
    Cubbies.initialize();
}        
