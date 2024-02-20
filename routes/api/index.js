const router = require("express").Router();
const customerRoutes = require("./customer.routes");
const productRoutes = require("./product.routes");


router.use("/customer", customerRoutes);
router.use("/product", productRoutes);



module.exports = router;