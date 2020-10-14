const { Router } = require('express');
// import all routers;
const authRouter = require("./auth.js");
const productRouter = require('./product.js');
const usuario = require("./usuario.js");
const review = require("./reviews.js");
const orden = require("./Orden.js");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

const { User } = require("../db.js");
const admin = require("./Admin.js");


const router = Router();




// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use('/auth', authRouter);
router.use('/users', usuario);
router.use('/products', productRouter);
router.use('/product', review);
router.use('/Admin', admin);
router.use('/orders', orden)




module.exports = router;
