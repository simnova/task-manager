define(function (require, exports, module) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  require("localstorage");
  var app = require("app");

  var Tasks = app.module();

  Tasks.Model = Backbone.Model.extend({
    defaults: {
      "title" : "",
      "description" : "",
      "completed" : "false"
    }
  });

  Tasks.Collection = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage("task"),
    model: Tasks.Model,
    done: function() {
      return this.where({done:true});
    },
    remaining: function() {
      return this.without.apply(this,this.done());
    },
    nextOrder: function() {
      if(!this.length) return 1;
      return this.last().get('order') + 1;
    },
    comparator:'order'
  });

  Tasks.Views.TaskListItem = Backbone.Layout.extend({
    template: "taskSummary",
    tagName: "li",
    name: "task",
    serialize: function () {
      return this.model.toJSON();
    }
  });

  Tasks.Views.Detail = Backbone.Layout.extend({
    template: "taskDetail",
    model:null,
    className: "post",

    events: {
      "click #saveTask" : "saveTask"
    },

    serialize: function () {
      return { task: this.model.toJSON() };
    },

    saveTask: function(){
      var self = this;
      var model = self.model;
      model.set({
        title: self.$('#title').val(),
        description: self.$('#description').val(),
        completed: self.$('#completed').is(':checked')
      });
      model.save();
    },

    initialize: function (options) {
      var self = this;
      var collection = new Tasks.Collection();
      collection.fetch();
      self.model = collection.find({id:options.TaskId});

      this.listenTo(this.model, 'change', self.render);
    },

    afterRender:function(){
      $("#content").trigger("create");
    }

  });

  Tasks.Views.Default = Backbone.Layout.extend({
    template: "tasks",

    events: {
      "click #addTask" : "addTask"
    },

    className: 'tasks',

    addTask: function(){
      var self = this;
      var newModel = self.collection.create({title: self.$('#newTaskTitle').val()});
      self.addTaskToList(newModel).render().promise().then(function(){
        $('#taskContainer').listview('refresh');
      });
    },

    collection: new Tasks.Collection(),

    addTaskToList: function(model){
      var self = this;
      var container = '#taskContainer';
      return self.insertView(container, new Tasks.Views.TaskListItem({ model: model }));
    },

    initialize: function () {
      var self = this;
      self.collection.fetch();
      console.log("initialized");
    },

    beforeRender: function () {
      var self = this;
      var container = '#taskContainer';
      self.collection.each(function(model) {
        self.addTaskToList(model);
      });
    },

    afterRender:function(){
      $("#content").trigger("create");
    }

  });

  return Tasks;
});
