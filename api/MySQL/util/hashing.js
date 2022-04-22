const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      err
        ? reject(err)
        : bcrypt.hash(password, salt, (err, hash) => {
            err ? reject(err) : resolve(hash);
          });
    });
  });
};

const verifyPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  verifyPassword,
};