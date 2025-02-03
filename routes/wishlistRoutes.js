const route = require("express").Router();
const WishlistController = require("../controllers/WishlistController");
const authentication = require("../middlewares/authentication");
const authorizationCustomerWishlist = require("../middlewares/authorizationCustomerWishlist");
const authorizationCustomerWishlistFromProduct = require("../middlewares/authorizationCustomerWishlistFromProduct");

route.use(authentication);
route.post("/", WishlistController.read);
route.post("/:ProductId", WishlistController.add);

route.delete("/:id", authorizationCustomerWishlist, WishlistController.delete);
route.delete("/ProductId/:ProductId", authorizationCustomerWishlistFromProduct, WishlistController.deleteFromProduct);

module.exports = route;