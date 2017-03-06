import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var store = this.store;
    return store.filter('todo', function(todo) {
      return todo.get('isCompleted');
    });
  }
});
