import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCoffee,
  faChild,
  faCircle,
  faArchive,
  faCheckCircle,
  faEllipsisV,
  faSearch,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faCoffee,
  faChild,
  faCircle,
  faArchive,
  faCheckCircle,
  faEllipsisV,
  faSearch,
  faPlusCircle,
  faComment,
  faTwitter,
  faFontAwesome,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const fontAwesomeOptions = {
  coffee: 'coffee',
  child: 'child',
  circle: 'circle',
  archive: 'archive',
  'check circle': 'check-circle',
  'ellipsis-v': 'ellipsis-v',
  search: 'search',
  'plus circle': 'plus-circle',
  comment: ['far', 'comment'],
  twitter: ['fab', 'twitter'],
  'font awesome': ['fab', 'font-awesome'],
};
export default fontAwesomeOptions;
