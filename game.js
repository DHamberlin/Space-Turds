const pi = Math.PI;

const game = {
  w: $('.walls').width(),
  h: $('.walls').height()
}

const w = $('.walls').width(),
      h = $('.walls').height();

var player = new Player(game.w/2, game.h/2, -pi/2);

var ship = d3.select('svg')
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
      window.shootInvterval = setInterval(player.shoot.bind(player), 200);
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
