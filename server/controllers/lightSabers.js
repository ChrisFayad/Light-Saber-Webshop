const LightSabers = require("../models/lightSabers");
const OrderLightSabers = require("../models/order");
const generatePrice = require("../utils/priceFormula");

const getAllSaber = async (req, res) => {
  try {
    const lightSabers = await LightSabers.find({});
    const response = {
      count: lightSabers.length,
      sabers: lightSabers.map((lightSaber) => {
        return {
          lightsaberID: lightSaber.id,
          lightsaberName: lightSaber.name,
          lightsaberAvailable: lightSaber.available,
          saberCrystal: lightSaber.crystal[0].color,
        };
      }),
    };
    res.status(200).json({ message: response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "app could not retrieve data from database!" });
  }
};
const getSaber = async (req, res) => {
  const filterID = req.params.id;
  try {
    const lightSaber = await LightSabers.findOne({
      id: filterID,
    });
    if (lightSaber === null) {
      res.status(404).json({
        message: `The Lightsaber with the ID ${filterID} is not found!`,
      });
    }
    res.status(200).json({ message: lightSaber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createSaber = async (req, res) => {
  try {
    const { id, name, available, crystal } = req.body;
    const newLightSaber = new LightSabers({ id, name, available, crystal });
    await newLightSaber.save();
    res.status(205).json({
      message: `The ${newLightSaber.name} LightSaber has been added!`,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422).json({ message: error.message.split(":")[2] });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
const orderSaber = async (req, res) => {
  try {
    const lightSaberName = req.params.name;
    const { Padawan_Name, Padawan_Age, Saber_Quantity } = req.body;
    let orderLightSaber = new OrderLightSabers({
      Padawan_Name,
      Padawan_Age,
    });
    generatePrice(Padawan_Age, lightSaberName, Saber_Quantity, orderLightSaber);
    res.status(201).json({
      message: "order successful",
      lightsabername: `${lightSaberName}`,
    });
  } catch (error) {}
};

const modifySaber = async (req, res) => {};

const deleteSaber = async (req, res) => {};

module.exports = {
  getAllSaber,
  getSaber,
  createSaber,
  orderSaber,
  modifySaber,
  deleteSaber,
};
