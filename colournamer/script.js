function hexToRGB(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}
function rgb2hsv(c) {
	let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
	rabs = c['r'] / 255;
	gabs = c['g'] / 255;
	babs = c['b'] / 255;
	v = Math.max(rabs, gabs, babs);
	diff = v - Math.min(rabs, gabs, babs);
	diffc = c => (v - c) / 6 / diff + 1 / 2;
	percentRoundFn = num => Math.round(num * 100) / 100;
	if (diff == 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rr = diffc(rabs);
		gg = diffc(gabs);
		bb = diffc(babs);

		if (rabs === v) {
			h = bb - gg;
		} else if (gabs === v) {
			h = (1 / 3) + rr - bb;
		} else if (babs === v) {
			h = (2 / 3) + gg - rr;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}
	return {
		h: Math.round(h * 360),
		s: percentRoundFn(s * 100),
		v: percentRoundFn(v * 100)
	}
}
function colourDiff2(c1, c2) {
	return Math.sqrt(
		Math.pow(c1['r'] - c2['r'], 2) +
		Math.pow(c1['g'] - c2['g'], 2) +
		Math.pow(c1['b'] - c2['b'], 2)
	)
}
function colourDiff(c1, c2) {
	c1hsv = rgb2hsv(c1)
	c2hsv = rgb2hsv(c2)
	dh = Math.min(Math.abs(c2hsv['h'] - c1hsv['h']), 360 - Math.abs(c2hsv['h'] - c1hsv['h'])) / 180.0
	ds = Math.abs(c2hsv['s'] - c1hsv['s']) / 100.0
	dv = Math.abs(c2hsv['v'] - c1hsv['v']) / 100.0
	return Math.sqrt(dh * dh + ds * ds + dv * dv)
}
function colourName(colour) {
	var diffs = []
	for (hexCode in colours) {
		diff = colourDiff(colour, hexToRGB(hexCode))
		if (diff < 80)
			diffs.push([diff, [hexCode, colours[hexCode]]])
	}
	ret = ""
	diffs.sort(function compare(diff1, diff2) {
		if (diff1[0] > diff2[0])
			return 1
		return 0
	})
	for (i = 0; i < 8; i++) {
		if (i >= diffs.length)
			break
		btns[i].outerHTML = "<button class=\"colour-btn\" type=\"button\" onclick=\"setHex('" + diffs[i][1][0] + "')\" style=\"background-color: " + diffs[i][1][0] + "\">" + diffs[i][1][1] + ' - ' + (100 * (1 - diffs[i][0])).toFixed(2) + "%</button>"
		//btns[i].outerHTML = "<button class=\"colour-btn\" type=\"button\" onclick=\"setHex('" + diffs[i][1][0] + "')\" style=\"background-color: " + diffs[i][1][0] + "\">" + diffs[i][1][1] + ' - ' + (100.0 * (255 - diffs[i][0]) / 255.0).toFixed(2) + "%</button>"
		//ret += diffs[i][1][1] + ' - ' + (100.0 * (255 - diffs[i][0]) / 255.0).toFixed(2) + '%<br>'
	}
	return ret
}
function update(c) {
	colourName(hexToRGB(c))
	bg.style.backgroundColor = c
	if (colorWheel.color.value < 75)
		document.getElementById('btn-div').style.color = 'white'
	else
		document.getElementById('btn-div').style.color = 'black'
}

function setHex(hex) {
	colorWheel.color.hexString = hex
	hexInput.value = hex
}

var colorWheel = new iro.ColorPicker("#colorWheelDemo", {

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

});

hexInput = document.getElementById('hex')
bg = document.getElementById('colorname')
btns = document.getElementsByClassName('colour-btn')
update(colorWheel.color.hexString)
hexInput.value = colorWheel.color.hexString
hexInput.addEventListener("change", function change() {
	update(hexInput.value)
	colorWheel.color.hexString = hexInput.value
})

colorWheel.on('color:change', function (color, changes) {
	update(colorWheel.color.hexString)
	hexInput.value = colorWheel.color.hexString
})