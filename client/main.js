import { Template } from 'meteor/templating';
import { layout, layoutList } from './layout'
import Chart from 'chart.js';
import './layout/openpage/openpage';
import './layout/salary/salary';
import './layout/basetaxes/basetaxes';
import './layout/additiontaxes/additiontaxes';

import './main.html';



Template.main.helpers({
  getLayout(pageId) {
    console.log('getLayout', layout, pageId)
    if (pageId >= 0)
      return layout.get() == pageId;
    return false; 
  },

  layoutList() {
    return layoutList;
  }
});