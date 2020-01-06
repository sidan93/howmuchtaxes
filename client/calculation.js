export default class Taxes {
  constructor(net) {
  }

  addMainTaxes(net) {
    this.net = net;
    let gross = net / 0.87;
    this.ndfl = parseInt(gross - net);
    this.oms = parseInt(gross * 0.051);  // Мед страхование
    this.ops = parseInt(gross * 0.22);   // Пенсионный фонд
    this.oss = parseInt(gross * 0.029);  // Соц страхование
    this.tr =  parseInt(gross * 0.002);  // Несчатные случаи (минимальная ставка)

    this.gross = parseInt(gross);
  }

  addLiveTaxes(petrolMoney, foodMoney, householdMoney, otherMoney) {
    this.petrol = petrolMoney * 0.65;
    this.food = foodMoney * 0.15;  // Средняя между 10 и 20% ндс
    this.household = householdMoney * 0.2;
    this.other = otherMoney * 0.1; // Минимальное

    this.petrolMoney = petrolMoney;
    this.foodMoney = foodMoney;
    this.householdMoney = householdMoney;
    this.otherMoney = otherMoney;

    return this; // TODO подумать
  }

  getMainTaxes(withNet=false) {
    let result = [
      this.ndfl,
      this.oms,
      this.ops,
      this.oss,
      this.tr
    ];
    if (withNet)
      result = result.concat([this.net]);
    return result;
  }

  getLiveTaxes() {
    return [
      this.petrol,
      this.food,
      this.household,
      this.other
    ]
  }

  getAllTaxes(withClear=false) {
    let result = this.getMainTaxes();
    let liveTaxes = this.getLiveTaxes();
    result = result.concat(liveTaxes);
    if (withClear) {
      result = result.concat([this.net - this.petrol - this.food - this.household - this.other]);
    }
    return result;
  }
}