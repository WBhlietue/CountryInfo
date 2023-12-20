const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
    officialName: { required: true, type: String },
    svg: { required: true, type: String },
    region: { required: true, type: String },
    subregion: { required: true, type: String },
    startOfWeek: { required: true, type: String },
    population: { required: true, type: String },
    area: { required: true, type: String },
    fifa: { required: true, type: String },
    capital: { required: true, type: String },
    timezones: { required: true, type: String },
    map: { required: true, type: String },
    _id: { required: true, type: String },
    cca2: { required: true, type: String },
});
module.exports = mongoose.model("CountryData", dataSchema);
