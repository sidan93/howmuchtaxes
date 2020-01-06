import { Template } from 'meteor/templating';

import './salary.html';


Template.salary.helpers({
  test() {
    return 'test';
  }
});