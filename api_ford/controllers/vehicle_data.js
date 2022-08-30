const VehicleData = require("../models/vehicle_data");

module.exports = (app) => {
  
  app.get("/vehicleData", (req, res) => {
    
    VehicleData.getAll(res);
  });

  app.get("/vehicleData/:vin", (req, res) => {
    const vin = req.params.vin;
    
    VehicleData.getForVin(vin, res);
  });

  app.get("/vehicleData/:id", (req, res) => {
    const id = parseInt(req.params.id);

    VehicleData.getForID(id, res);
  });

  app.post("/vehicleData", (req, res) => {
    const data = req.body;

    VehicleData.post(data, res);
  });

  app.patch("/vehicleData/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const value = req.body;

    VehicleData.alter(id, value, res);
  });

  app.delete("/vehicleData/:id", (req, res) => {
    const id = parseInt(req.params.id);

    VehicleData.delete(id, res);
  });
};