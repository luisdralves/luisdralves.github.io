var tabCamera = document.getElementById('tabCamera')
var tabPhoto = document.getElementById('tabPhoto')
var tabPicker = document.getElementById('tabPicker')

function tab (event, tab) {
  event.preventDefault()
  tabCamera.classList.remove('active')
  tabPhoto.classList.remove('active')
  tabPicker.classList.remove('active')
  document.getElementById(tab).classList.add('active')
  document.getElementById('tabCameraContent').style.display = 'none'
  document.getElementById('tabPhotoContent').style.display = 'none'
  document.getElementById('tabPickerContent').style.display = 'none'
  document.getElementById(tab + 'Content').style.display = 'block'
}

tabCamera.addEventListener('click', function (e) {
  tab(e, 'tabCamera')
})
tabPhoto.addEventListener('click', function (e) {
  tab(e, 'tabPhoto')
})
tabPicker.addEventListener('click', function (e) {
  tab(e, 'tabPicker')
})

function hexToRGB (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}
function rgb2hsv (c) {
  let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn
  rabs = c['r'] / 255
  gabs = c['g'] / 255
  babs = c['b'] / 255
  v = Math.max(rabs, gabs, babs)
  diff = v - Math.min(rabs, gabs, babs)
  diffc = c => (v - c) / 6 / diff + 1 / 2
  percentRoundFn = num => Math.round(num * 100) / 100
  if (diff == 0) {
    h = s = 0
  } else {
    s = diff / v
    rr = diffc(rabs)
    gg = diffc(gabs)
    bb = diffc(babs)

    if (rabs === v) {
      h = bb - gg
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb
    } else if (babs === v) {
      h = 2 / 3 + gg - rr
    }
    if (h < 0) {
      h += 1
    } else if (h > 1) {
      h -= 1
    }
  }
  return {
    h: Math.round(h * 360),
    s: percentRoundFn(s * 100),
    v: percentRoundFn(v * 100)
  }
}
function colourDiff2 (c1, c2) {
  return Math.sqrt(
    Math.pow(c1['r'] - c2['r'], 2) +
      Math.pow(c1['g'] - c2['g'], 2) +
      Math.pow(c1['b'] - c2['b'], 2)
  )
}
function colourDiff (c1, c2) {
  c1hsv = rgb2hsv(c1)
  c2hsv = rgb2hsv(c2)
  dh =
    Math.min(
      Math.abs(c2hsv['h'] - c1hsv['h']),
      360 - Math.abs(c2hsv['h'] - c1hsv['h'])
    ) / 180.0
  ds = Math.abs(c2hsv['s'] - c1hsv['s']) / 100.0
  dv = Math.abs(c2hsv['v'] - c1hsv['v']) / 100.0
  return Math.sqrt(dh * dh + ds * ds + dv * dv)
}
function colourName (colour) {
  var diffs = []
  for (hexCode in colours) {
    diff = colourDiff(colour, hexToRGB(hexCode))
    if (diff < 80) diffs.push([diff, [hexCode, colours[hexCode]]])
  }
  ret = ''
  diffs.sort(function compare (diff1, diff2) {
    if (diff1[0] > diff2[0]) return 1
    return 0
  })
  for (i = 0; i < 8; i++) {
    if (i >= diffs.length) break
    btns[i].outerHTML =
      '<button class="btn colour-btn" type="button" onclick="setHex(\'' +
      diffs[i][1][0] +
      '\')" style="background-color: ' +
      diffs[i][1][0] +
      '">' +
      diffs[i][1][1] +
      ' - ' +
      (100 * (1 - diffs[i][0])).toFixed(2) +
      '%</button>'
    //btns[i].outerHTML = "<button class=\"colour-btn\" type=\"button\" onclick=\"setHex('" + diffs[i][1][0] + "')\" style=\"background-color: " + diffs[i][1][0] + "\">" + diffs[i][1][1] + ' - ' + (100.0 * (255 - diffs[i][0]) / 255.0).toFixed(2) + "%</button>"
    //ret += diffs[i][1][1] + ' - ' + (100.0 * (255 - diffs[i][0]) / 255.0).toFixed(2) + '%<br>'
  }
  return ret
}
function update (c) {
  console.count()
  colourName(hexToRGB(c))
  bg.style.backgroundColor = c
  if (colorWheel.color.value < 75) {
    var bw = 'white'
    var btnsCam = document.getElementsByClassName('btn-outline-dark')
    console.log(btnsCam)
    while(btnsCam.item(0) !== null) {
      var btnCam = btnsCam.item(0)
      btnCam.classList.add('btn-outline-light')
      btnCam.classList.remove('btn-outline-dark')
    }
    console.log(btnsCam)
  } else {
    var bw = 'black'
    var btnsCam = document.getElementsByClassName('btn-outline-light')
    console.log(btnsCam)
    while(btnsCam.item(0) !== null) {
      var btnCam = btnsCam.item(0)
      btnCam.classList.add('btn-outline-dark')
      btnCam.classList.remove('btn-outline-light')
    }
    console.log(btnsCam)
  }

  bg.style.color = bw
  document.getElementById('btn-div').style.color = bw
  navs = document.getElementsByClassName('nav-link')
  for (var i = 0; i < navs.length; i++) {
    if (!navs.item(i).classList.contains('active')) navs.item(i).style.color = bw
    else navs.item(i).style.color = 'black'
  }
}

function setHex (hex) {
  colorWheel.color.hexString = hex
  hexInput.value = hex
}

var colorWheel = new iro.ColorPicker('#colorWheelDemo', {
  layout: [
    {
      component: iro.ui.Box
    },
    {
      component: iro.ui.Slider,
      options: {
        sliderType: 'hue', // can also be 'saturation', 'value', 'alpha' or 'kelvin',
        sliderShape: 'box'
      }
    }
  ]
})

hexInput = document.getElementById('hex')
bg = document.getElementsByTagName('body')[0]
btns = document.getElementsByClassName('colour-btn')
update(colorWheel.color.hexString)
hexInput.value = colorWheel.color.hexString
hexInput.addEventListener('change', function change () {
  update(hexInput.value)
  colorWheel.color.hexString = hexInput.value
})

colorWheel.on('color:change', function (color, changes) {
  update(colorWheel.color.hexString)
  hexInput.value = colorWheel.color.hexString
})

var video = document.querySelector('#cam')
var canvas = document.getElementById('pause')
var context = canvas.getContext('2d')

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream
    })
    .catch(function (err0r) {
      console.log('Something went wrong!')
    })
}

function resume () {
  video.style.display = 'block'
  canvas.style.display = 'none'
}

function stop () {
  //video.pause()
  video.style.display = 'none'
  canvas.style.display = 'block'
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  context.drawImage(video, 0, 0)
  // Other browsers will fall back to image/png
  //img.src = canvas.toDataURL('image/webp');
}

canvas.addEventListener('click', function (e) {
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  //https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element/42111623#42111623
  var rect = e.target.getBoundingClientRect()
  var x = e.clientX - rect.left //x position within the element.
  var y = e.clientY - rect.top //y position within the element.
  var ratio = video.videoWidth / 720
  x *= ratio
  y *= ratio
  pos = Math.ceil(y) * video.videoWidth * 4 + Math.ceil(x) * 4
  while (pos % 4 != 0) {
    //its always a multiple of 4 isnt it 🤔🤔🤔
    pos++
  }
  console.log(x, y, pos)

  hexInput.value =
    '#' +
    imageData.data[pos].toString(16).padStart(2, '0') +
    imageData.data[pos + 1].toString(16).padStart(2, '0') +
    imageData.data[pos + 2].toString(16).padStart(2, '0')
  colorWheel.color.hexString = hexInput.value
  window.scrollTo({
    left: 0,
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
})
