const fs = require("fs");
const Browser = require("zombie");

var browser = new Browser();
var total_js_time = 0;
var log_buf = '';

function Log(str) {
	log_buf += str + '\n';
}

function Summarize() {
	Log('Total JS time: ' + total_js_time / 1000000 + ' ms');
	fs.writeFileSync({{LOG_FILE}}, log_buf);
	process.exit();
}

browser.on('evaluated', function (code, result, filename, elapsedTime) {
  if (typeof code === 'string' || code instanceof String) {
  	Log('Evaluated a script in ' + elapsedTime + ' ns (' + filename + ')');
  }
  else if (code) {
  	Log('Executed an event handler in ' + elapsedTime + ' ns');
  }
  total_js_time += elapsedTime;
});

browser.visit({{URL}}, function () {});

setTimeout(Summarize, 10000);