class ErrorStats {
  constructor() {
    this.currentStatsEl = $('.error-current');
    this.averageStatsEl = $('.error-average');

    this.currentStatsEl.text('0.00%');
    this.averageStatsEl.text('0.00%');

    this.stats = [];
  }

  _updateAverage(persentage) {
    this.stats.push(persentage);

    let total = 0;
    for(let p of this.stats)
      total += p;

    this.averageStatsEl.text( (total / this.stats.length).toFixed(2) + '%');
  }

  update(counter, letters) {
    let persentage = counter.get() * 100 / letters.length;

    this._updateAverage(persentage);

    this.currentStatsEl.text(persentage.toFixed(2) + '%');
  }

}

export default ErrorStats;