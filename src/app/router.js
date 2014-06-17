  define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");
  var Tasks = require("modules/tasks");
  var app = require("app");
  require("jquerymobile");
  var ga = require("ga");

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
          ga('send', {
            'hitType': 'pageview',
            'page': '/tasks',
            'title': 'Task List'
          });
          $("#main").enhanceWithin().promise().then(function(){
            window.scrollTo(0,0);
          });
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
          ga('send', {
            'hitType': 'pageview',
            'page': '/task/' + taskId,
            'title': 'Task Detail'
          });
          $("#main").enhanceWithin().promise().then(function(){
            window.scrollTo(0,0);
          });
          // $("body").pagecontainer("change", "#main" , {allowSamePageTransition: true, transition : "slide", changeHash: false } );
        });
    }
  });
});