const Crystal = require("../models/crystal");
const OrderLightSabers = require("../models/order");

const getAllCrystals = async (req, res) => {
  try {
    const crystals = await Crystal.find({});
    const response = {
      count: crystals.length,
      crystal: crystals.map((crystal) => {
        return {
          crystalName: crystal.name,
          crystalInfo: {
            color: crystal.color,
            mode: crystal.mode,
            force: crystal.f,
            crystalPower: crystal.cr,
          },
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
const createCrystal = async (req, res) => {
  try {
    const { name, color, mode, f, cr } = req.body;
    const newCrystal = new Crystal({ name, color, mode, f, cr });
    await newCrystal.save();
    res.status(201).json({
      message: `The ${newCrystal.name} Crystal has been added!`,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422).json({ message: error.message.split(":")[2] });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
const modifyCrystal = async (req, res) => {
  const crystalNameQuery = req.query.name;
  const { mode } = req.body;
  try {
    const crystal = await Crystal.updateOne(
      {
        name: crystalNameQuery,
      },
      { $set: { mode: mode } }
    );
    if (crystal.acknowledged) {
      res
        .status(200)
        .json({ message: `The ${crystalNameQuery} Crystal has been updated!` });
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
const deleteCrystal = async (req, res) => {
  const crystalNameQuery = req.query.name;
  try {
    const crystal = await Crystal.deleteOne({ name: crystalNameQuery });
    if (crystal.deletedCount !== 0) {
      res.status(200).json(`The ${crystalNameQuery} Crystal has been deleted!`);
    } else {
      res
        .status(404)
        .json({ message: `The ${crystalNameQuery} Crystal is not found!` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderLightSabers.find({});
    const response = {
      count: orders.length,
      order: orders.map((order) => {
        return {
          padawanInfo: {
            PadawanName: order.Padawan_Name,
            PadawanAge: order.Padawan_Age,
          },
          orderDetails: {
            lightsaberName: order.Lightsaber[0].name,
            quantity: order.Lightsaber[0].quantity,
            totalPrice:
              order.Lightsaber[0].price * order.Lightsaber[0].quantity,
          },
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

module.exports = {
  getAllCrystals,
  createCrystal,
  modifyCrystal,
  deleteCrystal,
  getAllOrders,
};
