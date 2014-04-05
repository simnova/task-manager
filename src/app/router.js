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
        app.useLayout('layouts/default', {
          el: '#main',
          views: {
            '#content': new Tasks.Views.Default()
          }
        }).render().promise().then(function(){
          $("#main").trigger("create");
          //$("body").pagecontainer("change", "#main" , {allowSamePageTransition: true, transition : "slide", changeHash: false, reverse:true } );
        });
    },
    taskDetail: function(taskId) {
        app.useLayout('layouts/default', {
          el: '#main',
          views: {
            '#content': new Tasks.Views.Detail({TaskId: taskId})
          }
        }).render().promise().then(function(){
          $("#main").trigger("create");
          //$("body").pagecontainer("change", "#main" , {allowSamePageTransition: true, transition : "slide", changeHash: false } );
        });
    }
  });
});