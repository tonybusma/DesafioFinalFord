const expressConfig = require("./config/expressConfig");
const connection = require("./infrastructure/connection");
const Tables = require("./infrastructure/tables");

connection.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("Connected");

    Tables.init(connection);

    const app = expressConfig();

    app.listen(3000);
  }
});
