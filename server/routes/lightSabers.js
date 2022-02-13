const express = require("express");
const validator = require("../validation/validator");
const lightsaberValidationSchema = require("../validation/lightsaberValidationSchema");
const {
  getSaber,
  createSaber,
  orderSaber,
  getAllSaber,
  modifySaber,
  deleteSaber,
} = require("../controllers/lightSabers");

const router = express.Router();

router.get("/saber", getAllSaber);

router.get("/saber/:id", getSaber);

router.post("/saber", validator(lightsaberValidationSchema), createSaber);

router.post("/order/saber/:name", orderSaber);

router.patch("/saber", validator(lightsaberValidationSchema), modifySaber);

router.delete("/saber", deleteSaber);

module.exports = router;
