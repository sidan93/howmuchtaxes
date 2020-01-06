import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Chart from 'chart.js';
import Taxes from './calculation';

import './main.html';


let chart = null;
let result_taxes = new ReactiveVar();
let result_money = new ReactiveVar();
let taxes = new Taxes();



function get_value(name) {
  return parseInt(document.getElementById(name).value || 0);
}

Template.chart.onRendered(() => {
  taxes.addMainTaxes(get_value('net_salary'));
  // Set the data
  chart = new Chart('myChart', {
    type: 'pie',
    data: {
      labels: ['НДФЛ', 'ОМС', 'ОПС', 'ОСС', 'Травматизм', 'На руки'],
      datasets: [
        {
          label: `График для ${net_salary}`,
          backgroundColor: [
            'rgba(255, 0, 0, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255,0,0,1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
          data: taxes.getMainTaxes(true),
        }
      ],
    },
    options: {
      maintainAspectRatio: false,
      title: {
        display: true
      }
    },
  });
});

Template.in_data.events({
  'click #calc'(event, instance) {
    let netSalary = get_value('net_salary');
    taxes.addMainTaxes(netSalary);
    chart.data.datasets[0].data = taxes.getMainTaxes(true);
    chart.update();
  },

  'click #calc_2'() {
    let netSalary = get_value('net_salary');
    let petrol = get_value('petrol');
    let food = get_value('food');
    let household = get_value('household');
    let hold = get_value('hold');
    let other = Math.max(netSalary - petrol - food - hold, 0); // Чтоы не было отрицательного значения
    let dt2 = chart.data.datasets[1];
    taxes.addLiveTaxes(petrol, food, household, other);
    // todo вынести
    if (!dt2) {
      chart.data.labels = ['НДФЛ', 'ОМС', 'ОПС', 'ОСС', 'Травматизм', 'Бензин', 'Еда', 'Хозяйствнные нужды', 'Разное', 'На руки']
      chart.data.datasets.push({
        label: `График для ${net_salary}`,
        backgroundColor: [
          'rgba(255, 0, 0, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(0, 192, 192, 0.2)',
          'rgba(0, 192, 192, 0.2)',
          'rgba(0, 192, 192, 0.2)',
          'rgba(0, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255,0,0,1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(0, 192, 192, 1)',
          'rgba(0, 192, 192, 1)',
          'rgba(0, 192, 192, 1)',
          'rgba(0, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
        data: taxes.getAllTaxes(true),
      });
    } else {
      dt2.data = taxes.getAllTaxes(true);
    }

    chart.update();
  }
});


Template.result.helpers({
  get_result() {
    return parseInt(result_taxes.get());
  },

  get_money() {
    return parseInt(result_money.get());
  },

  get_taxes() {
    let money = parseInt(result_money.get());
    let taxes = parseInt(result_taxes.get());
    return parseInt(taxes / money * 100);
  }
});