let intervalID;
var done = 0;
var useColor = 1;
var fps = 5;
var repeatCount = 4;
var timesRepeated = repeatCount;

function repeatEveryFiveSeconds() {
  intervalID = setInterval(reset, 5000);
}

function getRandomWave(x, y) {
  return noise.simplex2(x, y);
}

function adjustCanvas(canvasElement) {
  done = 1;
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  return canvasElement;
}

window.addEventListener('resize', _ => adjustCanvas(canvas));

var canvas = adjustCanvas(document.createElement('canvas'));
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.addEventListener('click', reset);
//repeatEveryFiveSeconds()

var noiseX, noiseY, difference, x, y, thickness, frequency, gap, wavelength, baseY;

var colors = [
'#00e6e6',
'#00cccc',
'#00b3b3',
'#009999',
'#008080',
'#006666',
'white',
'#e6ffff',
'#ccffff',
'#b3ffff',
'#99ffff',
'#80ffff',
'#66ffff',
'#99004d',
'blue',
'#750b20',
'#fd5'];


var colors2 = [
'#E82020',
'#8C3C3C',
'#701C1C',
'#D19090',
'#4F3939',
'#BF1E1E',
'white',
'#e6ffff',
'#ccffff',
'#b3ffff',
'#99ffff',
'#80ffff',
'#66ffff',
'#99004d',
'blue',
'#750b20',
'#fd5'];


function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

reset();

function reset() {
  noiseX = noiseY = 0;
  x = y = 0;
  difference = .0125;
  thickness = 5 + Math.round(Math.random() * 30);
  frequency = 1;
  gap = thickness + Math.round(Math.random() * 10);
  wavelength = 100;
  baseY = -wavelength;
  noise.seed(Math.random());
  draw(null, true);
}

function repeat() {
  timesRepeated--;
  noiseX = noiseY = 0;
  x = y = 0;
  difference = .0125;
  thickness = 5 + Math.round(Math.random() * 30);
  frequency = 1;
  gap = thickness + Math.round(Math.random() * 10);
  wavelength = 100;
  baseY = -wavelength;
  noise.seed(Math.random());
  if (useColor == 1)
  {
    useColor = 2;
  } else {
    useColor = 1;
  }
  if (timesRepeated == 0)
  {
    timesRepeated = repeatCount;
    draw(null, true);
  } else {
    draw(null, false);
  }
}

function draw(ts, isFirst) {
  if (baseY < window.innerHeight + wavelength) {
    setTimeout(function () {//throttle requestAnimationFrame to 20fps
      requestAnimationFrame(draw);
    }, 1000 / fps);
    //setTimeout(draw, 250)
    //requestAnimationFrame(draw)
  } else {
    done = 1;
    requestAnimationFrame(repeat);
    //console.log('Draw Finished');
  }

  if (isFirst) {
    //console.log('Starting Draw isFirst')
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  x = 0;
  baseY += gap;
  noiseX = 0;
  noiseY += difference;

  while (x < window.innerWidth) {
    ctx.beginPath();
    ctx.moveTo(x, y + baseY);

    x += frequency;

    y = getRandomWave(
    noiseX += .004,
    noiseY) *
    wavelength;

    ctx.lineTo(x, y + baseY);
    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';
    if (useColor == 1)
    {
      ctx.strokeStyle = randomFrom(colors);
    } else {
      ctx.strokeStyle = randomFrom(colors2);
    }
    ctx.stroke();
  }
}