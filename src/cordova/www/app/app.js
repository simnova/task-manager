define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var _ = require("underscore");
  var $ = require("jquery");
  var Backbone = require("backbone");
  require("layoutmanager");

  console.log("mobile.config executing");
  $(document).on("mobileinit", function () {
      console.log("mobileinit fired");
      $.mobile.ajaxEnabled = false;
      $.mobile.linkBindingEnabled = false;
      $.mobile.hashListeningEnabled = false;
      $.mobile.pushStateEnabled = false;
  });

  // Alias the module for easier identification.
  var app = module.exports;

  // The root path to run the application through.
  app.root = "";

  Backbone.Layout.configure({
    manage: true,

    prefix: "app/templates/",

    // This method will check for prebuilt templates first and fall back to
    // loading in via AJAX.
    fetchTemplate: function (path) {
      // Concatenate the file extension.
      path = path + ".html";

      // Check for a global JST object.  When you build your templates for
      // production, ensure they are all attached here.
      var JST = window.JST || {};

      // If the path exists in the object, use it instead of fetching remotely.
      if (JST[path]) {
        return JST[path];
      }

      // If it does not exist in the JST object, mark this function as
      // asynchronous.
      var done = this.async();

      // Fetch via jQuery's GET.  The third argument specifies the dataType.
      $.get(path, function(contents) {
        // Assuming you're using underscore templates, the compile step here is
        // `_.template`.
        done(_.template(contents));

      }, "text");
    }

  });



  // Mix Backbone.Events, modules, and layout management into the app object.
  return _.extend(app, {
    // Create a custom object with a nested Views object.
    module: function(additionalProps) {
      return _.extend({ Views: {}, Models: {} }, additionalProps);
    },

    // Helper for using layouts.
    useLayout: function (name, options) {
      // Enable variable arity by allowing the first argument to be the options
      // object and omitting the name argument.
      if (_.isObject(name)) {
        options = name;
      }

      // Ensure options is an object.
      options = options || {};

      // If a name property was specified use that as the template.
      if (_.isString(name)) {
        options.template = name;
      }

      // Create a new Layout with options.
      var layout = new Backbone.Layout(_.extend({
        el: options.el
      }, options));

      // Cache the refererence.
      this.layout = layout;
      return this.layout;
    }
  }, Backbone.Events);
});