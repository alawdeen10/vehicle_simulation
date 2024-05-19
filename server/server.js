const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let data = {
  scenarios: [],
  vehicles: [],
};

fs.readFile("./data.json", (err, jsonData) => {
  if (err) {
    console.log("Error reading data file:", err);
  } else {
    data = JSON.parse(jsonData);
  }
});

app.get("/scenarios", (req, res) => {
  res.json(data.scenarios);
});

app.post("/scenarios", (req, res) => {
  const newScenario = req.body;
  newScenario.id = data.scenarios.length
    ? data.scenarios[data.scenarios.length - 1].id + 1
    : 1;
  data.scenarios.push(newScenario);

  fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write data" });
    }
    res.status(201).json(newScenario);
  });
});

app.delete("/scenarios/:id", (req, res) => {
  const scenarioId = parseInt(req.params.id);
  data.scenarios = data.scenarios.filter(
    (scenario) => scenario.id !== scenarioId
  );

  fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write data" });
    }
    res.status(200).json({ message: "Scenario deleted successfully" });
  });
});

app.get("/vehicles", (req, res) => {
  res.json(data.vehicles);
});

app.post("/vehicles", (req, res) => {
  const newVehicle = req.body;
  newVehicle.id = data.vehicles.length
    ? data.vehicles[data.vehicles.length - 1].id + 1
    : 1;
  data.vehicles.push(newVehicle);

  fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write data" });
    }
    res.status(201).json(newVehicle);
  });
});

app.delete("/vehicles/:id", (req, res) => {
  const vehicleId = parseInt(req.params.id);
  data.vehicles = data.vehicles.filter((vehicle) => vehicle.id !== vehicleId);

  fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write data" });
    }
    res.status(200).json({ message: "Vehicle deleted successfully" });
  });
});

app.put("/vehicles/:id", (req, res) => {
  const vehicleId = parseInt(req.params.id);
  const updatedVehicle = req.body;

  data.vehicles = data.vehicles.map((vehicle) =>
    vehicle.id === vehicleId ? { ...vehicle, ...updatedVehicle } : vehicle
  );

  fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write data" });
    }
    res.status(200).json(updatedVehicle);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
