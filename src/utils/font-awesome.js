import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';
import { faChild } from '@fortawesome/free-solid-svg-icons/faChild';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import { faArchive } from '@fortawesome/free-solid-svg-icons/faArchive';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faComment } from '@fortawesome/free-regular-svg-icons/faComment';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons/faFontAwesome';
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
