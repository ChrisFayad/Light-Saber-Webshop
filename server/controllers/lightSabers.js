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
const createSabers = async (req, res) => {
  const sabers = req.body.sabers.saber;
  try {
    sabers.forEach(async (saber) => {
      const id = String(saber.id);
      const name = String(saber.name);
      const available = Number(saber.available);
      const crystal = [
        {
          name: String(saber.crystal[0].name),
          color: String(saber.crystal[0].color),
        },
      ];
      const newLightSaber = new LightSabers({ id, name, available, crystal });
      await newLightSaber.save();
    });
    res.status(201).json({
      message: "The LightSabers has been added!",
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
    const newAvailable = await generatePrice(
      Padawan_Age,
      lightSaberName,
      Saber_Quantity,
      orderLightSaber
    );
    if (newAvailable >= 0) {
      await orderLightSaber.save();
      await LightSabers.updateOne(
        { name: lightSaberName },
        { $set: { available: newAvailable } }
      );
      res.status(201).json({
        message: "order successful",
        lightsabername: `${lightSaberName}`,
      });
    } else {
      res.status(422).json({
        message: `We don't have enough stock from ${lightSaberName}. Please consider changing the quantity of the order!`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const modifySaber = async (req, res) => {
  const saberNameQuery = req.query.name;
  const { name, available, crystal } = req.body;
  try {
    const saber = await LightSabers.updateOne(
      {
        name: saberNameQuery,
      },
      { $set: { name: name, available: available, crystal: crystal } }
    );
    if (saber.acknowledged) {
      res
        .status(200)
        .json({ message: `The ${saberNameQuery} Saber has been updated!` });
    } else {
      res.status(400).json({ message: "No content was provided!" });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422).json({ message: error.message.split(":")[2] });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const deleteSaber = async (req, res) => {
  const saberNameQuery = req.query.name;
  try {
    const saber = await LightSabers.deleteOne({ name: saberNameQuery });
    if (saber.deletedCount !== 0) {
      res.status(200).json(`The ${saberNameQuery} Saber has been deleted!`);
    } else {
      res
        .status(404)
        .json({ message: `The ${saberNameQuery} Saber is not found!` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSaber,
  getSaber,
  createSaber,
  createSabers,
  orderSaber,
  modifySaber,
  deleteSaber,
};
