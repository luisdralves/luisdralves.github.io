function hexToRGB(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}
function colourDiff(c1, c2) {
	return Math.sqrt(
		Math.pow(c1['r'] - c2['r'], 2) +
		Math.pow(c1['g'] - c2['g'], 2) +
		Math.pow(c1['b'] - c2['b'], 2)
	)
}
function colourName(colour) {
	var diffs = []
	colours.forEach((namedColour) => {
		diff = colourDiff(colour, hexToRGB(namedColour[0]))
		if (diff < 80)
			diffs.push([diff, namedColour])
	})
	ret = ""
	diffs.sort(function compare(diff1, diff2) {
		if (diff1[0] > diff2[0])
			return 1
		return 0
	})
	for (i = 0; i < 8; i++) {
		if (i >= diffs.length)
			break
		btns[i].outerHTML = "<button class=\"colour-btn\" type=\"button\" onclick=\"setHex('" + diffs[i][1][0] + "')\" style=\"background-color: " + diffs[i][1][0] + "\">" + diffs[i][1][1] + ' - ' + (100.0 * (255 - diffs[i][0]) / 255.0).toFixed(2) + "%</button>"
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