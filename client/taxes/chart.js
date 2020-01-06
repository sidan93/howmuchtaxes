import Chart from 'chart.js';

export class ChartItem {
  constructor(key, title, backgroundColor, borderColor, funcForValue) {
    this.key = key;
    this.title = title;
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
    this.funcForValue = funcForValue;
  }
}

export class TaxesChart {
  constructor(taxes, labels) {
    if (!taxes)
      throw 'Обязательно должны быть налоги';

    this.taxes = taxes;
    this.chart = null;
    this.labels = labels;

    this.currentLabel = [labels[0]];
    this.labelIndex = 1;
  }

  createChart(objectId) {
    this.chart = new Chart(objectId, {
      type: 'pie',
      data: {
        labels: this.currentLabel.map(i => i.title),
        datasets: [
          {
            label: `График`,
            backgroundColor: this.currentLabel.map(i => i.backgroundColor),
            borderColor: this.currentLabel.map(i => i.borderColor),
            borderWidth: 1,
            data: this.currentLabel.map(i => i.funcForValue())
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        title: {
          display: true
        }
      }
    });

    this.taxes.bindChart(this);
  }

  update() {
    // todo пока что только первый датасет
    if (!this.chart) return;

    this.chart.data.labels = this.currentLabel.map(i => i.title);
    this.chart.data.datasets[0].backgroundColor = this.currentLabel.map(i => i.backgroundColor);
    this.chart.data.datasets[0].borderColor = this.currentLabel.map(i => i.borderColor);
    this.chart.data.datasets[0].data = this.currentLabel.map(i => i.funcForValue());
    this.chart.update();
  }

  addNext() {
    if (this.labelIndex >= this.labels.length)
      return false;
    
    this.currentLabel = this.currentLabel.concat(this.labels[this.labelIndex]);
    this.labelIndex ++;
    this.update();
    return true;
  }
  addAll() {
    this.currentLabel = this.labels;
    this.labelIndex = this.currentLabel.length;
    this.update();
  }
}