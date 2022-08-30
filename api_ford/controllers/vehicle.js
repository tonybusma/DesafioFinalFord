const vehicles = require("../models/vehicle");
const Vehicles = require("../models/vehicle");

module.exports = (app) => {
  app.get("/vehicles", (req, res) => {
    Vehicles.getAll(res);
  });

  app.get("/vehicles/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Vehicles.getForID(id, res);
  });

  app.post("/vehicles", (req, res) => {
    const vehicle = req.body;

    Vehicles.post(vehicle, res);
  });

  app.patch("/vehicles/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const value = req.body;

    Vehicles.alter(id, value, res);
  });

  app.delete("/vehicles/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Vehicles.delete(id, res);
  });
};
