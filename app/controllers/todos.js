import Ember from 'ember';

export default Ember.Controller.extend({
  todos: Ember.computed(function() {
    return this.store.findAll('todo');
  }),
  allAreDone: Ember.computed.empty('active'),
  actions: {
    // Create Todo
    createTodo: function() {
      var title = this.get('title');

      if (!title) {return false;}
      if (!title.trim()) {return;}

      var todo = this.store.createRecord('todo', {
        title: title
      });

      todo.save();

      this.set('title', '');
    },

    clearCompleted: function() {
      let completed = this.get('completed');

      completed
        .toArray() // clone the array, so it is not bound while we iterate over and delete.
        .invoke('destroyRecord');
    },

    checkAllTodos: function() {
      let todos = this.get('todos');
      let allAreDone = this.get('allAreDone');

      todos.setEach('isCompleted', !allAreDone);
      todos.invoke('save');
    }
  },

  hasTodo: Ember.computed('todos.@each.length', function() {
    return this.get('todos.length');
  }),

  active: Ember.computed('todos.@each.isCompleted', function() {
    return this.get('todos').filterBy('isCompleted', false);
  }),

  remaining: Ember.computed('active.length', function() {
    return this.get('active.length');
  }),

  completed: Ember.computed('todos.@each.isCompleted', function() {
    return this.get('todos').filterBy('isCompleted');
  }),

  completedCount: Ember.computed('completed.length', function() {
    return this.get('completed.length');
  }),

  hasCompleted: Ember.computed.notEmpty('completed'),

  inflection: Ember.computed('remaining', function() {
    return this.get('remaining') === 1 ? 'item' : 'items';
  })
});
