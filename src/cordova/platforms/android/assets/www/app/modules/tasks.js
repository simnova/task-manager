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
      return this.where({completed:true});
    },
    remaining: function() {
      return this.without.apply(this,this.done());
    },
    all: function(){
      return this;
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
      return {task : this.model };
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
      return { task: this.model };
    },

    saveTask: function(){
      var self = this;
      var model = self.model;
      model.save.call(self,{
        title: self.$('#title').val(),
        description: self.$('#description').val(),
        completed: self.$('#completed').is(':checked')
      },{
        success:function(){
          self.render();
        }
      });
    },

    initialize: function (options) {
      var self = this;
      var collection = new Tasks.Collection();
      collection.fetch();
      self.model = collection.find({id:options.TaskId});

      this.listenTo(this.model, 'change', self.render);
    },

    afterRender:function(){
      $('#content').enhanceWithin();
      $('#completed').checkboxradio('refresh');
    }

  });

  Tasks.Views.Default = Backbone.Layout.extend({
    template: "tasks",

    events: {
      "click #addTask" : "addTask",
      "change input:radio[name=taskFilter]" : "applyFilter"
    },

    className: 'tasks',

    filterCollection: function(collectionToShow){
      var self = this;
      //hide all
      _.each(self.collection.models,function(model){
        $("#task-" + model.attributes.id).hide();
      });
      //show only ones 
      _.each(collectionToShow,function(model){
        $("#task-" + model.attributes.id).show();
      });
    },

    renderCollection: function(collection){
      var self = this;
      $('#taskContainer').empty();
      _.each(collection,function(model) {
        self.addTaskToList(model);
      });
    },

    addTaskToList: function(model){
      var self = this;
      var container = '#taskContainer';
      return self.insertView(container, new Tasks.Views.TaskListItem({ model: model, id: 'task-' + model.attributes.id }));
    },
    
    applyFilter: function(){
      var self = this;
      switch($("input:radio[name=taskFilter]:checked").val()){
        case "filterIncomplete":
          self.filterCollection.call(self,self.collection.remaining());
          break;
        case "filterCompleted":
          self.filterCollection.call(self,self.collection.done());
          break;
        case "filterNone":
          self.filterCollection.call(self,self.collection.models);
          break;
      }
    },

    addTask: function(){
      var self = this;
      var newModel = self.collection.create({title: self.$('#newTaskTitle').val()});
      self.addTaskToList(newModel).render().promise().then(function(){
        $('#taskContainer').listview('refresh');
      });
    },

    collection: new Tasks.Collection(),



    initialize: function () {
      var self = this;
      self.collection.fetch();
      console.log("initialized");
    },


    beforeRender: function () {
      var self = this;
      self.renderCollection(self.collection.models);

    },

    afterRender:function(){
      $('#content').enhanceWithin();
    }

  });

  return Tasks;
});
