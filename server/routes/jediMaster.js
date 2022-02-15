const express = require("express");
const validator = require("../validation/validator");
const crystalValidationSchema = require("../validation/crystalValidationSchema");
const {
  getAllCrystals,
  createCrystal,
  modifyCrystal,
  deleteCrystal,
  getAllOrders,
  getCrystal,
} = require("../controllers/JediMaster");

const router = express.Router();
router.get("/crystal", getAllCrystals);
router.post("/crystal", validator(crystalValidationSchema), createCrystal);
router.patch("/crystal", modifyCrystal);
router.delete("/crystal", deleteCrystal);

router.get("/orders", getAllOrders);
router.get("/crystal/:color", getCrystal);
module.exports = router;
