import { Template } from 'meteor/templating';
import './page1.html';

Template.page1.events({
  'click #bPage1'() {
    console.log(arguments);
  }
});