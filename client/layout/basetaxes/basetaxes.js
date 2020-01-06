import { Template } from 'meteor/templating';
import { layoutParams, changePage, layoutList } from '../../layout';
import { Taxes } from '../../taxes/taxes';
import { TaxesChart, ChartItem } from '../../taxes/chart';
import { ReactiveVar } from 'meteor/reactive-var';
import './basetaxes.html'

let taxes = new Taxes();
let fieldList = [
      new ChartItem('net', 'На руки', 'rgba(153, 102, 255, 0.2)', 'rgba(153, 102, 255, 1)', taxes.getNet.bind(taxes)),
      new ChartItem('ndfl', 'НДФЛ', 'rgba(255, 0, 0, 0.2)', 'rgba(255, 0, 0, 1)', taxes.getNdlf.bind(taxes)),
      new ChartItem('oms', 'ОМС', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)', taxes.getOms.bind(taxes)),
      new ChartItem('oss', 'ОСС', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 1)', taxes.getOss.bind(taxes)),
      new ChartItem('ops', 'ОПС', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)', taxes.getOps.bind(taxes)),
      new ChartItem('tr', 'Травматизм', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 1)', taxes.getTr.bind(taxes))
]
let chart = new TaxesChart(taxes, fieldList);

let localLayoutList = {
  NET: 0,
  NDFL: 1,
  OMS: 2,
  OSS: 3, 
  OPS: 4,
  TR: 5
};
let localLayout = new ReactiveVar(localLayoutList.NET);

Template.basetaxes.onRendered(() => {
  taxes.setNet(layoutParams.net);
  chart.createChart('myChart');
});

Template.basetaxes.events({
  'click button.next'() {
    let layout = localLayout.get();
    if (chart.addNext())
      localLayout.set(layout + 1);
  },

  'click button.nextpage'() {
    changePage(layoutList.ADDITIONTAXES);
  }
});

Template.basetaxes.helpers({
  getLayout(layoutId) {
    console.log('3 getLayout', localLayout.get(), layoutId);
    return localLayout.get() == layoutId;
  },

  layoutList() {
    return localLayoutList;
  }
});