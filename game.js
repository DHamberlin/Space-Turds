const pi = Math.PI;

const game = {
  w: $('.walls').width(),
  h: $('.walls').height()
}

const w = $('.walls').width(),
      h = $('.walls').height();

const player = {
  loc: {
    x: w/2,
    y: h/2
  },
  angle: -pi/2,
  move: function(dir) {
    if (dir === 'fwd') {
      player.loc.x += Math.cos(a) * 2;
      player.loc.y += Math.sin(a) * 2;
    } else if (dir === 'back') {
      player.loc.x -= Math.cos(a) * 2;
      player.loc.y -= Math.sin(a) * 2;
    }
    if (player.loc.x > game.w) {player.loc.x -= game.w;}
    if (player.loc.y > game.h) {player.loc.y -= game.h;}
    if (player.loc.x < 0) {player.loc.x += game.w;}
    if (player.loc.y < 0) {player.loc.y += game.h;}
    player.render();
  },
  shoot: function() {
    var turd = new Turd(player.loc.x, player.loc.y, player.angle);
    turd.move();
  },
  oldMove: function(axis, val) {
    player.loc[axis] += val;
    if (player.loc.x > game.w) {player.loc.x -= game.w;}
    if (player.loc.y > game.h) {player.loc.y -= game.h;}
    if (player.loc.x < 0) {player.loc.x += game.w;}
    if (player.loc.y < 0) {player.loc.y += game.h;}
    player.render();
  },
  rotate(dir) {
    if (dir === 'right') {
      player.angle += 2 * pi / 100;
    } else {
      player.angle -= 2 * pi/100;
    }
    player.angle = player.angle % (2 * pi);
    player.render();
  },
  getCoords: function() {
    a = player.angle;
    x = player.loc.x;
    y = player.loc.y;
    return `${x + 10 * Math.cos(a)},${y + 10 * Math.sin(a)}
      ${x + 10 * Math.cos(a + (7 / 6 * pi) )},${y + 10 * Math.sin(a + (7 / 6 * pi) )}
      ${x + 10 * Math.cos(a + (5 / 6 * pi) ) },${y + 10 * Math.sin(a + (5 / 6 * pi) )} `
  },
  render: function() {
    d3.select('.player')
      .attr('points', (p) => p.getCoords());
  }
};

var ships = d3.select('svg')
  .selectAll('polygon')
  .data([player])
  .enter()
  .append('polygon')
  .attr('class', 'player')
  .attr('points', (p) => p.getCoords());


d3.select('body').on('keydown', () => {
  var key = d3.event.code;
  //absolute movement
  if (key === 'KeyA') {
    if (!player.movingLeft) {
      window.leftInterval = setInterval(player.oldMove.bind(player, 'x', -1), 5)
    }
    player.movingLeft= true;
  } else if (key === 'KeyD') {
    if (!player.movingRight) {
      window.rightInterval = setInterval(player.oldMove.bind(player, 'x', +1), 5)
    }
    player.movingRight = true;
  } else if (key === 'KeyW') {
    if (!player.movingUp) {
      window.upInterval = setInterval(player.oldMove.bind(player, 'y', -1), 5)
    }
    player.movingUp = true;
  } else if (key === 'KeyS') {
    if (!player.movingDown) {
      window.downInterval = setInterval(player.oldMove.bind(player, 'y', +1), 5)
    }
    player.movingDown = true;
  }
  //relative movement
  else if (key === 'ArrowLeft') {
    if (!player.turningLeft) {
      window.turnLeftInterval = setInterval(function() {
        player.rotate('left');
      }, 5)
    }
    player.turningLeft = true;
  }
  else if (key === 'ArrowRight') {
    if (!player.turningRight) {
      window.turnRightInterval = setInterval(function() {
        player.rotate('right');
      }, 5)
    }
    player.turningRight = true;
  }
  else if (key === 'ArrowUp') {
    if (!player.movingFwd) {
      window.moveFwdInterval = setInterval(function() {
        player.move('fwd');
      }, 5)
    }
    player.movingFwd = true;
  }
  else if (key === 'ArrowDown') {
    if (!player.movingBack) {
      window.moveBackInterval = setInterval(function() {
        player.move('back');
      }, 5)
    }
    player.movingBack = true;
  }

  //shooting
  else if (d3.event.code === 'Space') {
    if (!player.shooting) {
      player.shooting = true;
      player.shoot();
      window.shootInvterval = setInterval(player.shoot, 200);
    }
  }
});

d3.select('body').on('keyup', () => {
  var key = d3.event.code;

  //absolute movement
  if (key === 'KeyA') {
    clearInterval(window.leftInterval);
    player.movingLeft = false;
  } else if (key === 'KeyD') {
    clearInterval(window.rightInterval);
    player.movingRight = false;
  } else if (key === 'KeyW') {
    clearInterval(window.upInterval);
    player.movingUp = false;
  } else if (key === 'KeyS') {
    clearInterval(window.downInterval);
    player.movingDown = false;
  }

  //relative movement
  else if (key === 'ArrowLeft') {
    clearInterval(window.turnLeftInterval);
    player.turningLeft = false;
  }
  else if (key === 'ArrowRight') {
    clearInterval(window.turnRightInterval);
    player.turningRight = false;
  } else if (key === 'ArrowUp') {
    clearInterval(window.moveFwdInterval);
    player.movingFwd = false;
  } else if (key === 'ArrowDown') {
    clearInterval(window.moveBackInterval);
    player.movingBack = false;
  }
  //shooting
  else if (d3.event.code === 'Space') {
    clearInterval(window.shootInvterval);
    player.shooting = false;
  }
});
