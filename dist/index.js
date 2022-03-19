"use strict";

var _express = _interopRequireDefault(require("express"));

require("dotenv/config");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = process.env.PORT || 4004;
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, './../src/views')));
app.use('/favicon.ico', _express["default"]["static"](_path["default"].join(__dirname, './../src/views/favicon.ico')));
app.get('/', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, './../src/views/index.html'));
});
app.get('/fighter/:name', function (req, res) {
  var name = req.params.name;
  res.send(name);
});
app.listen(4000, function () {
  console.log("listening in on port: ".concat(PORT));
});
//# sourceMappingURL=index.js.map