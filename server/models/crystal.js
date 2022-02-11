const mongoose = require("mongoose");

const mongoDB = mongoose.createConnection(process.env.USER_DB_CONNECTION);

const crystalSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    index: true,
  },
  mode: {
    type: String,
    required: false,
    trim: true,
  },
  f: {
    type: Number,
    required: true,
  },
  cr: {
    type: Number,
    required: true,
  },
});

crystalSchema.path("name").validate(async (name) => {
  const nameCount = await mongoDB.models.Crystal.countDocuments({ name });
  return !nameCount;
}, `The crystal you are trying to insert already exists!`);

module.exports = mongoDB.model("Crystal", crystalSchema);
