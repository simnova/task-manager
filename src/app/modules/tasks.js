define(function (require, exports, module) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var app = require("app");

  //Create a new module
  var Tasks = app.module();

  // Default Model.
  Tasks.Model = Backbone.Model.extend({
  //  urlRoot: "/api/Tasks",

  //  idAttribute: "UrlFriendlyTitle"
  });

  // Default Collection.
  Tasks.Collection = Backbone.Collection.extend({
    model: Tasks.Model,

    
  });

  Tasks.Views.Tasks = Backbone.Layout.extend({
    template: "taskSummary",
    tagName: "li",
    serialize: function () {
      return this.model.toJSON();
    }
  });

  Tasks.Views.Detail = Backbone.Layout.extend({
    template: "taskDetail",

    className: "post",

    serialize: function () {
      return { task: this.model.toJSON() };
    },

    initialize: function (options) {
      var self = this;
      self.model = new Tasks.Model({id:1, name: "Clean", detail: "Clean house"});
     //self.render();

      /*
      self.model = new Tasks.Model({ UrlFriendlyTitle: options.id });
      self.model.fetch({
        success: function () {
          self.render();
        }
      });
  */
    }
  });

  //Create default view
  Tasks.Views.Default = Backbone.Layout.extend({
    template: "tasks",

    className: 'tasks',

    collection: new Tasks.Collection([
      {id:1, name: "Clean", detail: "Clean house"},
      {id:2, name: "Homework", detail: "Do homework"},
      {id:3, name: "MakeBed", detail: "Make the Bed"}
    ]),

    initialize: function () {
      var self = this;
/*
      self.collection.fetch({
        success: function() {
          self.render();
        }
      });
*/
    },

    beforeRender: function () {
      var self = this;
      var container = '#taskContainer';
      self.collection.each(function(model) {
        self.insertView(container, new Tasks.Views.Tasks({ model: model }));
      });
    }
  });

  return Tasks;
});
