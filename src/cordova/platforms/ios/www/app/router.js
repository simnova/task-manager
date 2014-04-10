  define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");
  var Tasks = require("modules/tasks");
  var app = require("app");
  require("jquerymobile");

  console.log("router.. ajaxenabled =" + $.mobile.ajaxEnabled);
  // hate jquery mobile
  $.mobile.ajaxEnabled = false;
  $.mobile.linkBindingEnabled = false;
  $.mobile.hashListeningEnabled = false;
  $.mobile.pushStateEnabled = false;

  // Defining the application router.
  module.exports = Backbone.Router.extend({
    routes: {
      "": "index",
      "task/:taskId": "taskDetail"
    },

    index: function() {
        app.useLayout('layouts/default', {
          el: '#main',
          views: {
            '#content': new Tasks.Views.Default()
          }
        }).render().promise().then(function(){
          $("#main").enhanceWithin();
          $("body").pagecontainer("change", "#main" , {allowSamePageTransition: true, transition : "slide", changeHash: false, reverse:true } );
        });
    },
    taskDetail: function(taskId) {
        app.useLayout('layouts/default', {
          el: '#main',
          views: {
            '#content': new Tasks.Views.Detail({TaskId: taskId})
          }
        }).render().promise().then(function(){
          $("#main").enhanceWithin();
          $("body").pagecontainer("change", "#main" , {allowSamePageTransition: true, transition : "slide", changeHash: false } );
        });
    }
  });
});