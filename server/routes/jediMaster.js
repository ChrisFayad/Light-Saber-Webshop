const express = require("express");
const validator = require("../validation/validator");
const crystalValidationSchema = require("../validation/crystalValidationSchema");
const {
  getAllCrystals,
  createCrystal,
  modifyCrystal,
  deleteCrystal,
  getAllOrders,
} = require("../controllers/JediMaster");

const router = express.Router();
router.get("/crystal", getAllCrystals);
router.post("/crystal", validator(crystalValidationSchema), createCrystal);
router.patch("/crystal", validator(crystalValidationSchema), modifyCrystal);
router.delete("/crystal", deleteCrystal);

router.get("/orders", getAllOrders);
module.exports = router;
