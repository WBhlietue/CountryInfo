const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Model = require("./model");

require("dotenv").config();

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Connected");
});

const app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    const data = await Model.find();

    res.json(data);
});
app.post("/countries", (req, res) => {
    const data = new Model({
        officialName: req.body.officialName,
        svg: req.body.svg,
        region: req.body.region,
        subregion: req.body.subregion,
        startOfWeek: req.body.startOfWeek,
        population: req.body.population,
        area: req.body.area,
        fifa: req.body.fifa,
        capital: req.body.capital,
        timezones: req.body.timezones,
        map: req.body.map,
        _id: req.body.cca2,
        cca2: req.body.cca2,
    });
    try {
        const dataSave = data.save();
        res.status(200).json({ dataSave: "Asd" });
    } catch {
        res.status(400).json({ error: "error" });
    }
    console.log(req.body);
});

app.put("/countries/:id", async (req, res) => {
    const a =await Model.updateOne({_id:req.params.id}, req.body);
    res.json({res:"complete"});
})
app.delete("/countries/:id", async (req, res) => {
    const a =await Model.deleteOne({_id:req.params.id});
    res.json({res:"complete"});
})

app.get("/deleteAll", async(req, res)=>{
  const r =await Model.deleteMany({});
    res.send(r)
} )

app.get("/countries", async (req, res) => {
    const data = await Model.find();
    res.json(data);
});
app.get("/countries/:id", async (req, res)=>{
    const data = await Model.findById(req.params.id);
    res.json([data])
})

app.listen(8000, () => {
    console.log(`Server Started at ${8000}`);
});
