/* global define */

  define(function(require, exports, module) {
  'use strict';

  // External dependencies.
  var $ = require('jquery');
  var Backbone = require('backbone');
  var Tasks = require('modules/tasks');
  var app = require('app');
  require('jquerymobile');

  // Defining the application router.
  module.exports = Backbone.Router.extend({

    routes: {
      '': 'index',
      'task/:taskId': 'taskDetail'
    },

    index: function() {
      $('#main').hide();
      app.useLayout('layouts/default', {
        el: '#main',
        views: {
          '#content': new Tasks.Views.Default()
        }
      }).render().promise().then(function(){
        $('#main').show();
        $('#main').enhanceWithin().promise().then(function(){
          window.scrollTo(0,0);
          //JQuery Mobile page transitions don't really work in this context..
          //$('body').pagecontainer('change', '#main' , {allowSamePageTransition: true, transition : 'fade', changeHash: false, reverse:true } );
        });
      });
    },

    taskDetail: function(taskId) {
      $('#main').hide();
      app.useLayout('layouts/default', {
        el: '#main',
        views: {
          '#content': new Tasks.Views.Detail({TaskId: taskId})
        }
      }).render().promise().then(function(){
        $('#main').show();
        $('#main').enhanceWithin().promise().then(function(){
          window.scrollTo(0,0);
          //JQuery Mobile page transitions don't really work in this context..
          //$('body').pagecontainer('change', '#main' , {allowSamePageTransition: true, transition : 'fade', changeHash: false } );
        });
      });
    }
  });
});