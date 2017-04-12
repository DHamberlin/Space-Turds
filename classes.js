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

class Player {
  constructor(x, y, a) {
    this.x = x;
    this.y = y;
    this.a = a;
  }
  move (dir) {
    if (dir === 'fwd') {
      this.x += Math.cos(this.a) * 2;
      this.y += Math.sin(this.a) * 2;
    } else if (dir === 'back') {
      this.x -= Math.cos(this.a) * 2;
      this.y -= Math.sin(this.a) * 2;
    }
    if (this.x > game.w) {this.x -= game.w;}
    if (this.y > game.h) {this.y -= game.h;}
    if (this.x < 0) {this.x += game.w;}
    if (this.y < 0) {this.y += game.h;}
    this.render();
  }
  shoot() {
    var turd = new Turd(this.x, this.y, this.a);
    turd.move();
  }
  oldMove(axis, val) {
    this[axis] += val;
    if (this.x > game.w) {this.x -= game.w;}
    if (this.y > game.h) {this.y -= game.h;}
    if (this.x < 0) {this.x += game.w;}
    if (this.y < 0) {this.y += game.h;}
    this.render();
  }
  rotate(dir) {
    if (dir === 'right') {
      this.a += 2 * pi / 100;
    } else {
      this.a -= 2 * pi/100;
    }
    this.a = this.a % (2 * pi);
    this.render();
  }
  getCoords() {
    let a = this.a;
    let x = this.x;
    let y = this.y;
    return `${x + 10 * Math.cos(a)},${y + 10 * Math.sin(a)}
      ${x + 10 * Math.cos(a + (7 / 6 * pi) )},${y + 10 * Math.sin(a + (7 / 6 * pi) )}
      ${x},${y}
      ${x + 10 * Math.cos(a + (5 / 6 * pi) ) },${y + 10 * Math.sin(a + (5 / 6 * pi) )} `
  }
  render() {
    d3.select('.player')
      .attr('points', (p) => p.getCoords());
  }
};
