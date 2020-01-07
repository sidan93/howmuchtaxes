import { Template } from 'meteor/templating';
import { layer, layerList } from './layer'
import './layers/openpage/openpage';
import './layers/salary/salary';
import './layers/basetaxes/basetaxes';
import './layers/additiontaxes/additiontaxes';

import './main.html';


Template.main.helpers({
  getLayer(pageId) {
    if (pageId >= 0)
      return layer.get() == pageId;
    return false; 
  },

  layerList() {
    return layerList;
  }
});