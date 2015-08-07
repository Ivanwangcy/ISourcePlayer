$(function () {

  //Todo Model
  var Todo = Backbone.Model.extend({

    // Default attribute
    defaults: function(){
      title: "empty todo...",
      order: Todos.nextOrder(),
      done: false
    },
    toggle: function () {
      this.save({done: !this.get("done")});
    }

  });


  //Todo Collection
  var TodoList = Backbone.Collection.extend({
    model: Todo,
    localStorage: new Backbone.LocalStorage("todos-backbone"),
    done: function () {
      return this.where({done: true});
    },
    remaining: function () {
      return this.where({done: false});
    }
    nextOrder: function () {
      if(!this.length) return 1;
      return this.last().get("order") + 1;
    },
    comparator: 'order'
  });

  var Todos = new TodoList();

  //Todo Item View
  var TodoView = Backbone.View.extend({
    tagName: "li",
    template: _.template($('#item-template').html()),
    events: {
      "click .toggle"  : "toggleDone",
      "dbclick .view"  : "edit",
      "click a.destroy": "clear",
      "keypress .edit" : "updateOnEnter",
      "blur .edit"     : "close"
    },
    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    }
  });


});
