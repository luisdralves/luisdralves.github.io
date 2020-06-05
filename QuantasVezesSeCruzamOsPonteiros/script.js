var c = document.getElementById("clock");
var ctx = c.getContext("2d");
var x = 125
var y = 125
var r = 100
var h = 0, m = 0, s = 0
var tolerance = Math.PI / 360
var textColor = 'black'

function initClock() {
	ctx.clearRect(0, 0, c.width, c.height)
	ctx.strokeStyle = textColor;
	ctx.fillStyle = textColor;
	ctx.font = "14px Ubuntu";
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(x, y, r * 1.2, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.save();
	for (let i = 0; i < 60; i++) {
		ctx.beginPath();
		if (i % 5 == 0) {
			if (i == 0)
				ctx.fillText(12, x - 12 + 1.1 * r * Math.cos(2 * Math.PI * i / 60 - Math.PI / 2), y + 5 + 1.1 * r * Math.sin(2 * Math.PI * i / 60 - Math.PI / 2));
			else
				ctx.fillText(i / 5, x - 8 + 1.1 * r * Math.cos(2 * Math.PI * i / 60 - Math.PI / 2), y + 5 + 1.1 * r * Math.sin(2 * Math.PI * i / 60 - Math.PI / 2));
			ctx.moveTo(x + 0.9 * r * Math.cos(2 * Math.PI * i / 60 - Math.PI / 2), y + 0.9 * r * Math.sin(2 * Math.PI * i / 60 - Math.PI / 2));
		} else
			ctx.moveTo(x + 0.95 * r * Math.cos(2 * Math.PI * i / 60 - Math.PI / 2), y + 0.95 * r * Math.sin(2 * Math.PI * i / 60 - Math.PI / 2));
		ctx.lineTo(x + r * Math.cos(2 * Math.PI * i / 60 - Math.PI / 2), y + r * Math.sin(2 * Math.PI * i / 60 - Math.PI / 2));
		ctx.stroke();
	}
}

function animateHands(h, m, s) {
	hang = h / 12 + m / (12 * 60)
	mang = m / 60 + s / 3600
	sang = s / 60
	ctx.strokeStyle = textColor;
	ctx.beginPath();
	ctx.arc(x, y, 0.89 * r, 0, 2 * Math.PI);
	ctx.clip();
	ctx.clearRect(0, 0, 250, 250);
	ctx.beginPath();
	ctx.lineWidth = 2
	ctx.moveTo(x, y);
	ctx.lineTo(x + 0.4 * r * Math.cos(2 * Math.PI * hang - Math.PI / 2), y + 0.4 * r * Math.sin(2 * Math.PI * hang - Math.PI / 2));
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + 0.6 * r * Math.cos(2 * Math.PI * mang - Math.PI / 2), y + 0.6 * r * Math.sin(2 * Math.PI * mang - Math.PI / 2));
	ctx.stroke();
	ctx.beginPath();
	ctx.lineWidth = 1
	ctx.strokeStyle = "#FF0000";
	ctx.moveTo(x, y);
	ctx.lineTo(x + 0.85 * r * Math.cos(2 * Math.PI * sang - Math.PI / 2), y + 0.85 * r * Math.sin(2 * Math.PI * sang - Math.PI / 2));
	ctx.stroke();
	ctx.beginPath();
	ctx.lineWidth = 4
	ctx.strokeStyle = textColor;
	ctx.arc(x, y, 0.02 * r, 0, 2 * Math.PI);
	ctx.stroke();
	return [hang, mang, sang]
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function next() {
	document.getElementById("next").disabled = true
	s++
	if (s >= 60) {
		m++
		s = 0
		if (m >= 60) {
			h++
			m = 0
			if (h >= 24) {
				h = 0
			}
		}
	}
	angs = animateHands(h, m, s)
	document.querySelector('#time').innerHTML = `${("00" + h).slice(-2)}h${("00" + m).slice(-2)}m${("00" + s).slice(-2)}s`
	while (angs[0] >= 1)
		angs[0] -= 1
	if (Math.abs(angs[0] - angs[1]) < tolerance && Math.abs(angs[0] - angs[2]) < tolerance && Math.abs(angs[2] - angs[1]) < tolerance) {
		document.getElementById("next").disabled = false
		console.log(angs)
	} else {
		await sleep(1)
		next()
	}
}

initClock()
animateHands(h, m, s)