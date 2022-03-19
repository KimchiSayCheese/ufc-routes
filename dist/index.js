"use strict";

var _express = _interopRequireDefault(require("express"));

require("dotenv/config");

var _path = _interopRequireDefault(require("path"));

var _client = require("@prisma/client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const PORT = process.env.PORT || 4004;
const prisma = new _client.PrismaClient();
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_express.default.static(_path.default.join(__dirname, './../src/views')));
app.use('/favicon.ico', _express.default.static(_path.default.join(__dirname, './../src/views/favicon.ico')));
app.get('/', (req, res) => {
  res.sendFile(_path.default.join(__dirname, './../src/views/index.html'));
});
app.get('/fighter/:name', async (req, res) => {
  const {
    name
  } = req.params;
  const fighterFindManyArg = {
    where: {
      name: {
        contains: name
      }
    }
  };
  const data = await prisma.fighter.findMany(fighterFindManyArg);
  res.send(data);
});
app.listen(process.env.PORT, () => {
  console.log(`listening in on port: ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map