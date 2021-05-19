const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcrypt-nodejs"));
function hashPassword(user) {
  const SALT_FACTOR = 12;

  if (!user.changed("password")) {
    return;
  }

  return bcrypt.genSaltAsync(SALT_FACTOR).then(salt =>
    bcrypt.hashAsync(user.password, salt, null).then(hash => {
      user.setDataValue("password", hash);
    })
  );
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      contactnumber: { type: DataTypes.STRING, unique: true },
      role: { type: DataTypes.STRING }
    },
    {
      hooks: {
        beforeSave: hashPassword
      }
    }
  );

  User.prototype.comparePassword = function(password) {
    return bcrypt.compareAsync(password, this.password);
  };

  return User;
};
