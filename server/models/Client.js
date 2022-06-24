const mongoose = require("mongoose");

//mongoose schema is not related to graphql schema
//mongoose layer is object data mapper layer

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
