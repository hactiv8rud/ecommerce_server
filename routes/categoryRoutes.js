const route = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const authentication = require("../middlewares/authentication");
const authorizationAdmin = require("../middlewares/authorizationAdmin");

route.use(authorizationAdmin);
route.post("/add", CategoryController.add);
route.post("/:id", CategoryController.findByPk);
route.put("/:id", CategoryController.put);
route.delete("/:id", CategoryController.delete);

module.exports = route;