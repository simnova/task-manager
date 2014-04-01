define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");
  require("jquery");
  require("jquerymobile");
  var Tasks = require("modules/tasks");
  var app = require("app");

  // Defining the application router.
  module.exports = Backbone.Router.extend({
    routes: {
      "": "index",
      "task/:taskId": "taskDetail"
    },

    index: function() {
      //$.mobile.changePage( "#main" , { reverse: false, changeHash: false } );
      //$.mobile.loading( "show" );
        app.useLayout('layouts/default', {
          el: '#main',
          views: {
            '#content': new Tasks.Views.Default()
          }
        }).render().promise().then(function(){
          $( document ).on( "mobileinit", function() {
            $("#main").trigger("create");
            console.log("page changed.");
            $("body").pagecontainer("change", "#main" , {allowSamePageTransition: true, transition : "slide", changeHash: false, reverse:true } );
          });
        });

      console.log("Welcome to your / route.");
    },
taskDetail: function(taskId) {
      //$.mobile.changePage( "#main" , { reverse: false, changeHash: false } );
      
        app.useLayout('layouts/default', {
          el: '#main',
          views: {
            '#content': new Tasks.Views.Detail({TaskId: taskId})
          }
        }).render().promise().then(function(){
          $("#main").trigger("create");
          console.log("page changed1.");
          $("body").pagecontainer("change", "#main" , {allowSamePageTransition: true, transition : "slide", changeHash: false } );
        });

      console.log("Welcome to your detail route.");
    }


  });
});