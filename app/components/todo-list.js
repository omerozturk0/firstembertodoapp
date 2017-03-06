import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "li",
  classNameBindings: ["todo.isCompleted:completed", "isEditing:editing"],

  init() {
    this._super(...arguments);
    this.set('isEditing', false);
  },

  actions: {
    // Toggle Completed
    toggleCompleted: function(todo) {
      todo.toggleProperty('isCompleted');
      todo.save();
    },

    // Make isEditing True
    makeEditTodo: function() {
      this.set('isEditing', true);
    },

    // Edit Todo
    editTodo: function(todo, title) {
      if (Ember.isEmpty(title)) {
        todo.destroyRecord();
      } else {
        this.set('isEditing', false);
        todo.set('title', title);
        todo.save();
      }
    },

    // Delete Todo
    deleteTodo: function(todo) {
      todo.destroyRecord();
    }
  }
});
