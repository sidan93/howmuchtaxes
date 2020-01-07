import { Template } from 'meteor/templating';
import { TaxesChart, ChartItem } from '../../taxes/chart';
import { AdditionTaxes } from '../../taxes/taxes';
import { layerParams } from '../../layer';

import './additiontaxes.html';

let additiontaxes = new AdditionTaxes();
let fieldList = [
  new ChartItem('net', 'Остаток', 'rgba(153, 102, 255, 0.2)', 'rgba(153, 102, 255, 1)', additiontaxes.getRest.bind(additiontaxes)),
  new ChartItem('petrol', 'Бензин', 'rgba(255, 0, 0, 0.2)', 'rgba(255, 0, 0, 1)', additiontaxes.getPetrol.bind(additiontaxes)),
  new ChartItem('food', 'Еда', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)', additiontaxes.getFood.bind(additiontaxes)),
  new ChartItem('household', 'Дом', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 1)', additiontaxes.getHousehold.bind(additiontaxes)),
  new ChartItem('other', 'Разное', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)', additiontaxes.getOther.bind(additiontaxes)),
];
let chart = new TaxesChart(additiontaxes, fieldList);
chart.addAll();
let defaultParams = null;

Template.additiontaxes.onRendered(() => {
  defaultParams = {
    petrol: Math.min(parseInt(layerParams.net * 0.1), 5000),  // Посчитаем как 10% от зп или 5к максимум,
    food :  Math.min(parseInt(layerParams.net * 0.5), 15000), // Как полвина ЗП или 15к максимум
    household: Math.min(parseInt(layerParams.net * 0.05), 3000), // Как 5% или 3к
  }
  // Все остальное посчитаем в расходы на кафе и прочие покупки
  defaultParams.other = Math.max(layerParams.net - defaultParams.petrol - defaultParams.food - defaultParams.household, 0);

  additiontaxes.setNet(layerParams.net);
  additiontaxes.setPetrol(defaultParams.petrol);
  additiontaxes.setFood(defaultParams.food);
  additiontaxes.setHousehold(defaultParams.household);
  additiontaxes.setOther(defaultParams.other);
  
  calcMaxValues();
  chart.createChart('additionChart');

  //FIXME костыль, т.к. значения по умолчанию сбрасываются ((
  $('input.food')[0].value = defaultParams.food;
  $('input.petrol')[0].value = defaultParams.petrol;
  $('input.household')[0].value = defaultParams.household;
  $('input.other')[0].value = defaultParams.other;
});


let foodMax = new ReactiveVar();
let petrolMax = new ReactiveVar();
let householdMax = new ReactiveVar();
let otherMax = new ReactiveVar();
function calcMaxValues(title=null) {
  let currNet = additiontaxes.getNet();
  let allSum = currNet - additiontaxes.foodSum - additiontaxes.householdSum - additiontaxes.otherSum - additiontaxes.petrolSum;

  if (title != 'food') {
    foodMax.set(Math.max(allSum + additiontaxes.foodSum, 0));  }
  if (title != 'petrol')
    petrolMax.set(Math.max(allSum + additiontaxes.petrolSum));
  if (title != 'household')
    householdMax.set(Math.max(allSum + additiontaxes.householdSum));
  if (title != 'other')
    otherMax.set(Math.max(allSum + additiontaxes.otherSum));
}
calcMaxValues();

Template.additiontaxes.events({
  'change input.net, input input.net'(jObject) {
    let newNet = parseInt(jObject.target.value);
    $('.net-value').html(newNet);
    additiontaxes.setNet(newNet);
    calcMaxValues();
  },
  'change input.food, input input.food'(jObject) {
    let newFood = parseInt(jObject.target.value);
    $('.food-value').html(newFood);
    additiontaxes.setFood(newFood);
    calcMaxValues('food');
  },
  'change input.petrol, input input.petrol'(jObject) {
    let newPetrol = parseInt(jObject.target.value);
    $('.petrol-value').html(newPetrol);
    additiontaxes.setPetrol(newPetrol);
    calcMaxValues('petrol');
  },
  'change input.household, input input.household'(jObject) {
    let newHousehold = parseInt(jObject.target.value);
    $('.household-value').html(newHousehold);
    additiontaxes.setHousehold(newHousehold);
    calcMaxValues('household');
  },
  'change input.other, input input.other'(jObject) {
    let newOther = parseInt(jObject.target.value);
    $('.other-value').html(newOther);
    additiontaxes.setOther(newOther);
    calcMaxValues('other');
  }
})

Template.additiontaxes.helpers({
  getNet() {
    return layerParams.net;
  },
  defaultParams() {
    return defaultParams;
  },
  getFoodMax() {
    return foodMax.get();
  },
  getHouseholdMax() {
    return householdMax.get();
  },
  getOtherMax() {
    return otherMax.get();
  },
  getPetrolMax() {
    return petrolMax.get();
  }
});