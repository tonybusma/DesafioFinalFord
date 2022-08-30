const connection = require("../infrastructure/connection");

class Vehicles {

    getAll(res) {
        const sql = "SELECT id, model, total_volume, connected, software_updates FROM Vehicles";

        connection.query(sql, (error, result) => {
            if (error) {
              res.status(400).json(error);
            } else {
              res.status(200).json(result);
            }
          });
    }

    getForID(id, res) {
        const sql = `SELECT id, model, total_volume, connected, software_updates FROM Vehicles WHERE id=${id}`;

        connection.query(sql, (error, result) => {
            const value = result[0];
            if (error) {
              res.status(400).json(error);
            } else {
              res.status(200).json(value);
            }
          });
    }

    post(vehicle, res) {

    const modelIsValid = vehicle.model.length != 0 && !null;
    const volumeIsValid = vehicle.total_volume.length != 0 && !null;
    const connectedIsValid = vehicle.connected.length != 0 && !null;
    const softIsValid = vehicle.software_updates.length != 0 && !null;

    const validators = [
      {
        field: "model",
        valid: modelIsValid,
        message: "O campo 'modelo' não pode ser vazio.",
      },
      {
        field: "total_volume",
        valid: volumeIsValid,
        message: "O campo 'total de vendas' não pode ser nulo.",
      },
      {
        field: "connected",
        valid: connectedIsValid,
        message: "O campo 'conectados' não pode ser nulo.",
      },
      {
        field: "software_updates",
        valid: softIsValid,
        message: "O campo 'update software' não pode ser nulo.",
      }
    ];

    const err = validators.filter((field) => !field.valid);
    const errTrue = err.length;

    if (errTrue) {
      res.status(400).json(err);
    } else {
      const vehicleValue = { ...vehicle };

        const sql = `INSERT INTO vehicles SET ?`;

        connection.query(sql, vehicleValue, (error, result) => {
            if (error) {
              res.status(400).json(error);
            } else {
              res.status(201).json(vehicle);
            }
          });
        }
    }

    alter(id, value, res) {

        const sql = "UPDATE vehicles SET ? WHERE id=?";

        connection.query(sql, [value, id], (error, result) => {

            if(error) {
              res.status(400).json(error);
            } else {
              res.status(200).json({...value, id});
            }
          });
    }
    

    delete(id, res) {
        const sql = `DELETE FROM vehicles WHERE id=${id}`;

        connection.query(sql, (error, result) => {
            if (error) {
              res.status(400).json(error);
            } else {
              res.status(200).json({id});
            }
          });
    }

}

module.exports = new Vehicles();