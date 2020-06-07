import * as filters from './filters';
import Vue from 'vue';

Vue.filter('prefixArrayValues', filters.prefixArrayValues);

Vue.filter('todoSpecial', filters.todoSpecial);

Vue.filter('date', filters.date);

Vue.filter('default', filters.defaultValue);

Vue.filter('todoDone', filters.todoDone);

Vue.filter('todoPriority', filters.todoPriority);