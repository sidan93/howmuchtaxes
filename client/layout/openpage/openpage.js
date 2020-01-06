import { Template } from 'meteor/templating';
import { changePage, layoutList } from '../../layout';
import './openpage.html';


Template.openpage.events({
  'click button'() {
    changePage(layoutList.ENTERSALLARY);
  }
});