const connection = require("../infrastructure/connection");

class User {
  getAll(res) {
    const sql = "SELECT id, user_name, email, password, full_name, join_date FROM User";

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }

  getForID(id, res) {
    const sql = `SELECT id, user_name, email, password, full_name, join_date FROM User WHERE id=${id}`;

    connection.query(sql, (error, result) => {
      const value = result[0];
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(value);
      }
    });
  }

  post(user, res) {
    function validateEmail(email) {
      var res = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      return res.test(email);
    }

    const nameIsValid = user.user_name.length != 0;
    const emailIsValid = validateEmail(user.email);
    const passwordIsValid = user.password.length != 0;
    const fullNameIsValid = user.full_name.length != 0;

    const validators = [
      {
        field: "name",
        valid: nameIsValid,
        message: "O campo 'name' não pode ser vazio.",
      },
      {
        field: "email",
        valid: emailIsValid,
        message: "O email deve ter um formato válido.",
      },
      {
        field: "password",
        valid: passwordIsValid,
        message: "O campo 'password' não pode ser vazio.",
      },
      {
        field: "fullName",
        valid: fullNameIsValid,
        message: "O campo 'full name' não pode ser vazio.",
      },
    ];

    const err = validators.filter((field) => !field.valid);

    const errTrue = err.length;

    if (errTrue) {
      res.status(400).send(err);
    } else {
      const userValue = { ...user };

      const sql = `INSERT INTO User SET ?`;

      connection.query(sql, userValue, (error, result) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(201).json(user);
        }
      });
    }
  }

  alter(id, value, res) {
    const sql = "UPDATE user SET ? WHERE id=?";

    connection.query(sql, [value, id], (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ ...value, id });
      }
    });
  }

  delete(id, res) {
    const sql = `DELETE FROM user WHERE id=${id}`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new User();
