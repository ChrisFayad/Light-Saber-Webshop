const LightSabers = require("../models/lightSabers");

const getSaber = async (req, res) => {
  const filterID = req.params.id;
  try {
    const lightSaber = await LightSabers.findOne({
      id: filterID,
    });
    if (lightSaber === null) {
      res
        .status(404)
        .json({ msg: `The Lightsaber with the ID ${filterID} is not found!` });
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
const orderSaber = async (req, res) => {};

const getAllSaber = async (req, res) => {};

const modifySaber = async (req, res) => {};

const deleteSaber = async (req, res) => {};

module.exports = {
  getSaber,
  createSaber,
  orderSaber,
  getAllSaber,
  modifySaber,
  deleteSaber,
};