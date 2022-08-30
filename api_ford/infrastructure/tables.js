class Tables {
  init(connection) {
    this.connection = connection;

    this.createTables();
    this.insertDatas();
  }
  
  createTables() {
    const tableUser =
      "CREATE TABLE IF NOT EXISTS User (id int NOT NULL AUTO_INCREMENT, user_name varchar(20) NOT NULL, email varchar(30), password varchar(20) NOT NULL, full_name varchar(50) NOT NULL, join_date datetime NOT NULL default now(), PRIMARY KEY(id))";
    const tableVehicle =
      "CREATE TABLE IF NOT EXISTS Vehicles (id int NOT NULL AUTO_INCREMENT, model varchar(30) NOT NULL, total_volume int NOT NULL, connected int NOT NULL, software_updates int NOT NULL, PRIMARY KEY(id))";
    const tableVehicleData =
      "CREATE TABLE IF NOT EXISTS VehicleData (id int NOT NULL AUTO_INCREMENT, vin varchar(20) NOT NULL, odometer int NOT NULL, tire_pressure varchar(15) NOT NULL, vehicle_status varchar(3) NOT NULL, battery_status varchar(15) NOT NULL, fuel_level int NOT NULL, latitude varchar(10) NOT NULL, longitude varchar(10) NOT NULL, PRIMARY KEY(id))";

    this.connection.query(tableUser, (error) => {
      if (error) {
        console.log(error);
      }
    });
    this.connection.query(tableVehicle, (error) => {
      if (error) {
        console.log(error);
      }
    });
    this.connection.query(tableVehicleData, (error) =>
      error ? console.log(error) : console.log("Tables created successfully")
    );
  }

  insertDatas() {
    const user = `INSERT INTO User (user_name, email, password, full_name) 
    VALUES ('admin', 'admin@email.com', 'admin123', 'System Admin')`;

    const vehicles = `INSERT INTO Vehicles (model, total_volume, connected, software_updates) 
    VALUES ('Ranger', 145760, 70000, 27550), ('Mustang', 1500, 500, 750), ('Territory', 4560, 4000, 3050), 
            ('Bronco Sport', 7560, 4060, 2050)`;

    const vehicle_data = `INSERT INTO VehicleData (vin, odometer, tire_pressure, vehicle_status, 
                        battery_status, fuel_level, latitude, longitude)
    VALUES ('2FRHDUYS2Y63NHD22454', 23344, '36,36,35,34', 'On', 'Ok', 76, '-12,2322', '-35,2314'),
            ('2RFAASDY54E4HDU34874', 130000, '36,34,36,33', 'Off', 'Recharge', 19, '-12,2322', '-35,2314'),
            ('2FRHDUYS2Y63NHD22455', 50000, '36,36,35,34', 'On', 'Ok', 90, '-12,2322', '-35,2314'),
            ('2RFAASDY54E4HDU34875', 10000, '36,34,36,33', 'Off', 'Ok', 25, '-12,2322', '-35,2314'),
            ('2FRHDUYS2Y63NHD22654', 23544, '36,36,35,34', 'On', 'Ok', 76, '-12,2322', '-35,2314'),
            ('2FRHDUYS2Y63NHD22854', 23574, '36,36,35,34', 'On', 'Ok', 76, '-12,2322', '-35,2314')`;

    this.connection.query(
      "SELECT id, user_name, email, password, full_name, join_date FROM User",
      (err, res) => {
        if (res.length == 0) {
          this.connection.query(user, (error) => {
            if (error) {
              console.log(error);
            }
          });
        }
      }
    );
    this.connection.query(
      "SELECT id, model, total_volume, connected, software_updates FROM Vehicles",
      (err, res) => {
        if (res.length == 0) {
          this.connection.query(vehicles, (error) => {
            if (error) {
              console.log(error);
            }
          });
        }
      }
    );
    this.connection.query(
      "SELECT id, vin, odometer, tire_pressure, vehicle_status, battery_status, fuel_level, latitude, longitude FROM VehicleData",
      (err, res) => {
        if (res.length == 0) {
          this.connection.query(vehicle_data, (error) => {
            if (error) {
              console.log(error);
            }
          });
        }
      }
    );
  }
}

module.exports = new Tables();
