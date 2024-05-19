import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./css/AddVehicle.css";

const AddVehicle = ({ onVehicleAdded }) => {
  const [name, setName] = useState("");
  const [posX, setPosX] = useState("");
  const [posY, setPosY] = useState("");
  const [speed, setSpeed] = useState("");
  const [direction, setDirection] = useState("");
  const [scenarioId, setScenarioId] = useState("");
  const [scenarios, setScenarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const response = await api.get("/scenarios");
        setScenarios(response.data);
      } catch (error) {
        console.error("Error fetching scenarios:", error);
      }
    };
    fetchScenarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVehicle = {
      name,
      initialPositionX: parseFloat(posX),
      initialPositionY: parseFloat(posY),
      speed: parseFloat(speed),
      direction,
      scenarioId: parseInt(scenarioId),
    };
    try {
      const response = await api.post("/vehicles", newVehicle);
      if (onVehicleAdded) {
        onVehicleAdded(response.data);
      }
      setName("");
      setPosX("");
      setPosY("");
      setSpeed("");
      setDirection("");
      setScenarioId("");
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  const handleReset = () => {
    setName("");
    setPosX("");
    setPosY("");
    setSpeed("");
    setDirection("");
    setScenarioId("");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="vehicles">
      <div className="head">
        <h4>Vehicle / add</h4>
        <h2>Add Vehicle</h2>
      </div>
      <form onSubmit={handleSubmit} className="vehicle-form">
        <div className="inputs">
          <div className="vehicle-name">
            <h4>Vehicle Name</h4>
            <input
              type="text"
              placeholder="Vehicle Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="vehicle-x">
            <h4>Initial Position X</h4>
            <input
              type="number"
              placeholder="Initial Position X"
              value={posX}
              onChange={(e) => setPosX(e.target.value)}
              required
            />
          </div>
          <div className="vehicle-y">
            <h4>Initial Position Y</h4>
            <input
              type="number"
              placeholder="Initial Position Y"
              value={posY}
              onChange={(e) => setPosY(e.target.value)}
              required
            />
          </div>
          <div className="vehicle-speed">
            <h4>Speed</h4>
            <input
              type="number"
              placeholder="Speed"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              required
            />
          </div>
          <div className="vehicle-direction">
            <h4>Direction</h4>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              required
            >
              <option value="">Select Direction</option>
              <option value="Towards">Towards</option>
              <option value="Backwards">Backwards</option>
              <option value="Upwards">Upwards</option>
              <option value="Downwards">Downwards</option>
            </select>
          </div>
          <div className="vehicle-sceanrios">
            <h4>Scanerio List</h4>
            <select
              value={scenarioId}
              onChange={(e) => setScenarioId(e.target.value)}
              required
            >
              <option value="">Select Scenario</option>
              {scenarios.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="buttons">
          <button type="submit" className="vehicle-add">
            Add
          </button>
          <button type="button" onClick={handleReset} className="vehicle-reset">
            Reset
          </button>
          <button type="button" onClick={handleGoBack} className="vehicle-back">
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicle;
