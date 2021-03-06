const route = require("express").Router();
const HistoryController = require("../controllers/HistoryController");
const authentication = require("../middlewares/authentication");
const authorizationCustomerHistory= require("../middlewares/authorizationCustomerHistory");

route.use(authentication);
route.post("/", HistoryController.add);
route.get("/", HistoryController.read);

route.use("/:id", authorizationCustomerHistory);
route.delete("/:id", HistoryController.delete);

module.exports = route;