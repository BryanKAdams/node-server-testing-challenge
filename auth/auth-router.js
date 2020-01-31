const bcrypt = require('bcryptjs'); // npm i bcryptjs
const router = require('express').Router();
const dbHelper = require('../data/model/model');
const secrets = require('./secrets');
const jwt = require('jsonwebtoken'); // installed this library

router.post('/register', (req, res) => {
  let credentials = req.body;
  console.log(req.body);

  bcrypt.hash(credentials.password, 12, (err, hashedPassword) => {

    if(err) {
        res.status(500).json({message: "Error while hashing password", error: err});
    }

    dbHelper.addUser({...credentials, password: hashedPassword})
      .then(creds => {
        res.status(201).json({...creds, token: generateToken(credentials)});
      })
      .catch(error => {
          console.log(error)
        res.status(500).json({ message: "Error while saving credentials to DB, make sure you provided the correct data for registration. Is username already in use?" });
      });
  });
});

router.post('/login', (req, res) => {

  let { username, password } = req.body;

  dbHelper.getUserByUsername(username)
  .then(user => {

    console.log("user? ", user);
    if (user && bcrypt.compareSync(password, user.password)) {
      console.log("bcrypt");
      const token = generateToken(user);

      res.status(200).json( {
        message: `Welcome, ${user.username}!`,
        token,
        user_id: user.id
      })
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  })
  .catch(error => {
    res.status(500).json({ message: "Error finding user with that username" });
  });

});

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    department: user.department
    // ...otherData
  };

  const options = {
    expiresIn: '14d'
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}

module.exports = router;