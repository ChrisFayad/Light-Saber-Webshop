const LightSabers = require("../models/lightSabers");
const Crystal = require("../models/crystal");

const generatePrice = async (Padawan_Age, lightSaberName, orderLightSaber) => {
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
    name: lightSaber.crystal[0].name,
    quantity: 1,
    price: price,
  };
  await orderLightSaber.save();
  const newAvailable =
    lightSaber.available - orderLightSaber.Lightsaber[0].quantity;
  await LightSabers.updateOne(
    { name: lightSaber.name },
    { $set: { available: newAvailable } }
  );
};

module.exports = generatePrice;
