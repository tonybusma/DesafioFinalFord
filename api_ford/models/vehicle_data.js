const connection = require("../infrastructure/connection");
//vehicle_data
class VehicleData {
  getAll(res) {
    const sql =
      `SELECT id, vin, odometer, tire_pressure, vehicle_status, battery_status, fuel_level, latitude, longitude FROM VehicleData`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }

  getForID(id, res) {
    const sql = `SELECT id, vin, odometer, tire_pressure, vehicle_status, battery_status, fuel_level, latitude, longitude FROM VehicleData WHERE id=${id}`;

    connection.query(sql, (error, result) => {
      const value = result[0];
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(value);
      }
    });
  }

  getForVin(vin, res) {
    const sql = `SELECT id, vin, odometer, tire_pressure, vehicle_status, battery_status, fuel_level, latitude, longitude FROM VehicleData WHERE vin LIKE '%${vin}%'`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }

  post(vehicleData, res) {
    const vinIsValid = vehicleData.vin.length == 20 && !null;
    const odometerIsValid = vehicleData.odometer.length != 0;
    const tirePressureIsValid = vehicleData.tire_pressure.length != 0;
    const statusIsValid = vehicleData.vehicle_status.length != 0;
    const batteryIsValid = vehicleData.battery_status.length != 0;
    const fuelIsValid = vehicleData.fuel_level.length != 0;
    const latitudeIsValid = vehicleData.latitude.length != 0;
    const longitudeIsValid = vehicleData.longitude.length != 0;

    const validators = [
      {
        valid: vinIsValid,
        message: "O campo 'vin' é obrigatório e deve ter 20 caracteres.",
      },
      {
        valid: odometerIsValid,
        message: "O campo 'odometer' não pode ser vazio.",
      },
      {
        valid: tirePressureIsValid,
        message: "O campo 'tire pressure' não pode ser vazio.",
      },
      {
        valid: statusIsValid,
        message: "O campo 'vehicle status' não pode ser vazio.",
      },
      {
        valid: batteryIsValid,
        message: "O campo 'battery status' não pode ser vazio.",
      },
      {
        valid: fuelIsValid,
        message: "O campo 'fuel level' não pode ser vazio.",
      },
      {
        valid: latitudeIsValid,
        message: "O campo 'latitude' não pode ser vazio.",
      },
      {
        valid: longitudeIsValid,
        message: "O campo 'longitude' não pode ser vazio.",
      },
    ];

    const err = validators.filter((field) => !field.valid);
    const errTrue = err.length;

    if (errTrue) {
      res.status(400).json(err);
    } else {
      const vehicleValue = { ...vehicleData };

      const sql = `INSERT INTO VehicleData SET ?`;

      connection.query(sql, vehicleValue, (error, result) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(201).json(vehicleData);
        }
      });
    }
  }

  alter(id, value, res) {
    const sql = "UPDATE VehicleData SET ? WHERE id=?";

    connection.query(sql, [value, id], (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ ...value, id });
      }
    });
  }

  delete(id, res) {
    const sql = `DELETE FROM VehicleData WHERE id=${id}`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new VehicleData();
