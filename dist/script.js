var X = $('.dvd').position().left, 
    Y = $('.dvd').position().top;

var SCREENSIZE = { 
  X: $(window).width(),
  Y: $(window).height()
}

var INFOS = {
  hits: 0,
  hitsCorner: 0,
  proba: 0
}

var DVDSIZE = { 
  X: 265,
  Y: 120
}

var direction = {
  X: 10,
  Y: 10
}

var COLOR = { R: 150, G: 150, B: 150 }

setup();
setInterval(draw, 40);

function setup() {
  X = SCREENSIZE.X - DVDSIZE.X - 250;
  Y = SCREENSIZE.Y - DVDSIZE.Y - 100;
  randomColor();
}

function draw() {
  X += direction.X;
  Y += direction.Y;
  
  let RIGHT = (X + DVDSIZE.X >= SCREENSIZE.X);
  let LEFT = X <= 0;
  let TOP = Y <= 0;
  let BOTTOM = (Y + DVDSIZE.Y >= SCREENSIZE.Y);
  
  if(hitCorner()) {
    INFOS.hitsCorner++;
  }
  
  if(TOP) {
    direction.Y = -direction.Y;
    Y = 0;
    randomColor();
    INFOS.hits++;
    $('#tick').trigger("play");
  }
  if(BOTTOM) {
    direction.Y = -direction.Y;
    Y = SCREENSIZE.Y - DVDSIZE.Y;
    randomColor();
    INFOS.hits++;
    $('#tick').trigger("play");
  }
  if(LEFT) {
    direction.X = -direction.X;
    X = 0;
    randomColor();
    INFOS.hits++;
    $('#tick').trigger("play");
  }
  if(RIGHT) {
    direction.X = -direction.X;
    X = SCREENSIZE.X - DVDSIZE.X;
    randomColor();
    INFOS.hits++;
    $('#tick').trigger("play");
  }
  
  $('.dvd').css({
    'top': Y + 'px',
    'left': X + 'px',
    'background-color': 'rgb('+COLOR.R+','+COLOR.G+','+COLOR.B+')'
  });
  
  $('.infos').html(
    'HITS: ' + INFOS.hits + '<br>' +
    'HITS CORNER: ' + INFOS.hitsCorner + '<br>' 
  );
  
  SCREENSIZE = { 
    X: $(window).width(),
    Y: $(window).height()
  }
}

function randomColor() {
  COLOR.R = Math.floor(Math.random() * Math.floor(156)) + 100;
  COLOR.G = Math.floor(Math.random() * Math.floor(256)) + 0;
  COLOR.B = Math.floor(Math.random() * Math.floor(156)) + 100;
}

function hitCorner() {
  let RIGHT = (X + DVDSIZE.X >= SCREENSIZE.X);
  let LEFT = X <= 0;
  let TOP = Y <= 0;
  let BOTTOM = (Y + DVDSIZE.Y >= SCREENSIZE.Y);
  
  return ((TOP && LEFT) || (TOP && RIGHT) || (BOTTOM && LEFT) || (BOTTOM && RIGHT));
}