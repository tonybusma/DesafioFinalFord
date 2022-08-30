const user = require("../models/user");

module.exports = (app) => {

  app.get("/user", (req, res) => {
    user.getAll(res);
  });

  app.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);

    user.getForID(id, res);
  });

  app.post("/user", (req, res) => {
    const userValues = req.body;

    user.post(userValues, res);
  });

  app.patch("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const value = req.body;

    user.alter(id, value, res);
  });

  app.delete("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);

    user.delete(id, res);
  });
};
