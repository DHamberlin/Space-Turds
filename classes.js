let turdCount = 0;
window.intervals = [];

class Turd {
  constructor (x, y, a) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.id = turdCount;
    d3.select('svg')
      .append('circle')
      .attr('class', 'turd' + turdCount)
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', 2);
    turdCount++;
    this.move();
  }
  move () {
    if (this.x < 0 || this.x > game.w || this.y < 0 || this.x > game.w) {
      clearTimeout(window.intervals[this.id]);
      d3.select('.turd' + this.id)
        .remove()
    } else {
      this.x += Math.cos(this.a) * 3;
      this.y += Math.sin(this.a) * 3;
      d3.select('.turd' + this.id)
      .attr('cx', this.x)
      .attr('cy', this.y)
      window.intervals[this.id] = setTimeout(this.move.bind(this), 50);
    }
  }
}
