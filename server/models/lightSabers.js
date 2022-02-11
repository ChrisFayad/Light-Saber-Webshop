const mongoose = require("mongoose");

const mongoDB = mongoose.createConnection(process.env.USER_DB_CONNECTION);

const lightSabersSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    index: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    index: true,
  },
  available: {
    type: Number,
    required: true,
  },
  crystal: [
    {
      name: String,
      color: String,
    },
  ],
});

lightSabersSchema.path("id").validate(async (id) => {
  const idCount = await mongoDB.models.LightSabers.countDocuments({ id });
  return !idCount;
}, `The id you are trying to insert already exists!`);

lightSabersSchema.path("name").validate(async (name) => {
  const nameCount = await mongoDB.models.LightSabers.countDocuments({ name });
  return !nameCount;
}, `The lightsaber you are trying to insert already exists!`);

module.exports = mongoDB.model("LightSabers", lightSabersSchema);
