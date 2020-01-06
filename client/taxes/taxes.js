class CommonTaxes {
  constructor() {
    this.chart = null;
  }

  setNet(net) {
    this.net = net;
    this.calc();
    this.update();
  }

  getNet() { return this.net || 0; }

  bindChart(chart) {
    this.chart = chart;
  }

  update() {
    if (this.chart)
      this.chart.update();
  }  
  
}

export class Taxes extends CommonTaxes {
  getNdlf() { return this.ndlf; }
  getOms() { return this.oms; }
  getOps() { return this.ops; }
  getOss() { return this.oss; }
  getTr()  { return this.tr;  }


  calc() {
    let gross = this.net / 0.87;
    this.ndlf = parseInt(gross - this.net);
    this.oms = parseInt(gross * 0.051);  // Мед страхование
    this.ops = parseInt(gross * 0.22);   // Пенсионный фонд
    this.oss = parseInt(gross * 0.029);  // Соц страхование
    this.tr =  parseInt(gross * 0.002);  // Несчатные случаи (минимальная ставка)
    this.gross = parseInt(gross);
  }
}

export class AdditionTaxes extends CommonTaxes {
  constructor() {
    super();
    this.petrol = 0;
    this.food = 0;
    this.other = 0;
    this.household = 0;
  }

  setPetrol(sum) {
    this.petrolSum = sum;
    this.calc();
    this.update();
  }

  setHousehold(sum) {
    this.householdSum = sum;
    this.calc();
    this.update();
  }

  setFood(sum) {
    this.foodSum = sum;
    this.calc();
    this.update();
  }

  setOther(sum) {
    this.otherSum = sum;
    this.calc();
    this.update();
  }

  getRest() { return this.rest || 0; }
  getPetrol() { return this.petrol || 0; }
  getHousehold() { return this.household || 0; }
  getFood() { return this.food || 0; }
  getOther() { return this.other || 0; }

  calc() {
    if (this.petrolSum)
      this.petrol = this.petrolSum * 0.65;
    if (this.foodSum)
      this.food = this.foodSum * 0.20;
    if (this.householdSum)
      this.household = this.householdSum * 0.20;
    if (this.otherSum)
      this.other = this.otherSum * 0.2;

    this.rest = Math.max(this.net - this.petrol - this.food - this.household - this.other);
  }
}