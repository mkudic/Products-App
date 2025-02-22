const sequelize = require("../config/db");
const { Sequelize, where, Op } = require("sequelize");
const { check, validationResult } = require("express-validator");

const User = require("../models/User")(sequelize, Sequelize);

//POST method for oneUser
exports.createUser = (req, res) => {
  const { name, surname, username, address, phone, password, email, access} = req.body;
  const user = {
    name,
    surname,
    username,
    address,
    phone,
    password,
    email,
    access,
  };
  User.create(user)
    .then((data) => {
      const alert = "User successfully added!"
      res.render("addUser", {layout: "dashAdmin", alert})
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error creating the user.",
      });
    });
};

//GET method for allUsers
exports.getAllUsers = async (req, res) => {
  await User.findAll({ where: { username: { [Op.not]: "admin" } } })
    .then((rows) => {
      let users = [];
      rows.forEach((element) => {
        users.push(element.dataValues);
      });
      res.render("users", { layout: "dashAdmin", users });
    })
    .catch((err) => {
      console.log(err);
    });
};

// GET method for oneUser
exports.getUser = (req, res) => {
  //console.log(req.params.id);
  User.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting user with id: " + req.params.id,
      });
    });
};

// GET method for rendering "editUser" page
exports.editUser = (req, res) => {
  let userId = req.params.id;
  User.findOne({ where: { id: userId } })
    .then((user) => {
      const data = user.dataValues;
     // console.log(data);
      res.render("editUser", { layout: "dashAdmin", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting user with id: " + id,
      });
    });
};
// POST method for updating user
exports.updateUser = (req, res) => {
  let userId = req.params.id;
  const object = {...req.body, id: userId}
  User.update(object, { where: { id: userId } })
    .then((user) => {
      const data = object
      const alert = "User successfully updated!";
      res.render("editUser", { layout: "dashAdmin", alert, data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting user with id: " + id,
      });
    });
};
// GET method for rendering "removeUser" page
exports.removeUser = (req, res) => {
  let userId = req.params.id;
  User.findOne({ where: { id: userId } })
    .then((user) => {
      const data = user.dataValues;
     // console.log(data);
      res.render("removeUser", { layout: "dashAdmin", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting user with id: " + userId,
      });
    });
};
//DELETE method for oneUser
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
      const alert = `User deleted successfully!`;
      res.render("removeUser", { layout: "dashAdmin", alert });      
    } else {
        res.send({
          message: "Not posible to delete the user.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting the user with id: " + id,
      });
    });
};
/*--------------------------------------------------------------------------------------------------------*/

//DELETE method for allUsers
exports.deleteAllUsers = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: "Table users is destroyed!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error destroying table users.",
      });
    });
};

// PUT method for updating name
exports.updateName = (req, res) => {
  User.update(
    {
      name: req.body.name,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((num) => {
      if (num == 1) {
        let object = { status: "User name changed successfully!" };
        res.send(object);
      } else {
        let object = { status: "Can't update user's name!" };
        res.send(object);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user's name!",
      });
    });
};

// PUT method for updating surname
exports.updateSurname = (req, res) => {
  User.update(
    {
      surname: req.body.surname,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((num) => {
      if (num == 1) {
        let object = { status: "User surname changed successfully!" };
        res.send(object);
      } else {
        let object = { status: "Can't update user's surname!" };
        res.send(object);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user's surname!",
      });
    });
};

// PUT method for updating username
exports.updateUsername = (req, res) => {
  User.update(
    {
      username: req.body.username,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((num) => {
      if (num == 1) {
        let object = { status: "User username changed successfully!" };
        res.send(object);
      } else {
        let object = { status: "Can't update user's username!" };
        res.send(object);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user's username!",
      });
    });
};

// PUT method for updating address
exports.updateAddress = (req, res) => {
  User.update(
    {
      address: req.body.address,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((num) => {
      if (num == 1) {
        let object = { status: "User address changed successfully!" };
        res.send(object);
      } else {
        let object = { status: "Can't update user's address!" };
        res.send(object);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user's address!",
      });
    });
};

// PUT method for updating email
exports.updateEmail = (req, res) => {
  User.update(
    {
      email: req.body.email,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((num) => {
      if (num == 1) {
        let object = { status: "User email changed successfully!" };
        res.send(object);
      } else {
        let object = { status: "Can't update user's email!" };
        res.send(object);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user's email!",
      });
    });
};

// PUT method for updating phone
exports.updatePhone = (req, res) => {
  User.update(
    {
      phone: req.body.phone,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((num) => {
      if (num == 1) {
        let object = { status: "User phone changed successfully!" };
        res.send(object);
      } else {
        let object = { status: "Can't update user's phone!" };
        res.send(object);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user's phone",
      });
    });
};

// PUT method for updating password
exports.updatePassword = (req, res) => {
  User.update(
    {
      password: req.body.password,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((num) => {
      if (num == 1) {
        let object = { status: "User password changed successfully!" };
        res.send(object);
      } else {
        let object = { status: "Can't update user's password!" };
        res.send(object);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user's password",
      });
    });
};

// PUT method for updating access
exports.updateAccess = (req, res) => {
  User.update(
    {
      access: req.body.access,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((num) => {
      if (num == 1) {
        let object = { status: "User access changed successfully!" };
        res.send(object);
      } else {
        let object = { status: "Can't update user's access!" };
        res.send(object);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user's access!",
      });
    });
};
