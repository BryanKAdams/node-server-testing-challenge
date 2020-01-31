const router = require("express").Router();
const db = require("../data/model/model");
const authorized = require("../auth/auth-middleware");

router.use(authorized);

router.get("/", (req, res) => {
  db.getUserByDepartment(req.user.department)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(400).json({ message: "Could not get Users" });
    });
});

function onlyDepartment(department) {
  return function(req, res, next) {
    if(req.user && req.user.department && req.user.department.toLowerCase() === department) {
      next();
    }
    else {
      res.status(403).json({
        message: "no users for that department"
      })
    }
  }
}

module.exports = router;
