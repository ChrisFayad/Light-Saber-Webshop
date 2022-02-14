const LightSabers = require("../models/lightSabers");
const Crystal = require("../models/crystal");

const generatePrice = async (
  Padawan_Age,
  lightSaberName,
  Saber_Quantity,
  orderLightSaber
) => {
  let lightSaber = await LightSabers.findOne({
    name: lightSaberName,
  });
  const crystal = await Crystal.findOne({
    color: lightSaber.crystal[0].color,
  });
  const price = Math.round(
    crystal.cr / ((crystal.f / 100) * (Padawan_Age * 10))
  );
  orderLightSaber.Lightsaber = {
    name: lightSaberName,
    quantity: Saber_Quantity,
    price: price * Saber_Quantity,
  };
  const newAvailable = lightSaber.available - Saber_Quantity;
  return newAvailable;
};

module.exports = generatePrice;
