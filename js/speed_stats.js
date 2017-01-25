class SpeedStats {
  constructor() {
    this.currentStatsEl = $('.speed-current');
    this.averageStatsEl = $('.speed-average');

    this.currentStatsEl.text('---');
    this.averageStatsEl.text('---');

    this.stats = [];
  }

  _updateAverage(speed) {
    this.stats.push(speed);

    let total = 0;
    for(let s of this.stats)
      total += s;

    this.averageStatsEl.text(Math.round(total / this.stats.length));
  }

  update(time, letters) {
    let speed = Math.round((letters.length / (time / 1000) ) * 60);

    this._updateAverage(speed);

    this.currentStatsEl.text(speed);
  }

}

export default SpeedStats;