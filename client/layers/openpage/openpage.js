import { Template } from 'meteor/templating';
import { changePage, layerList } from '../../layer';
import './openpage.html';


Template.openpage.events({
  'click button'() {
    changePage(layerList.ENTERSALLARY);
  }
});