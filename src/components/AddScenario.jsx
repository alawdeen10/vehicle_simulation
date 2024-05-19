import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./css/AddScenario.css";

const AddScenario = ({ onScenarioAdded }) => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newScenario = { name, time };
      const response = await api.post("/scenarios", newScenario);
      if (onScenarioAdded) {
        onScenarioAdded(response.data);
      }
      setName("");
      setTime("");
      setError("");
    } catch (err) {
      console.error("Error adding scenario:", err);
      setError("Failed to add scenario. Please try again.");
    }
  };

  const handleReset = () => {
    setName("");
    setTime("");
    setError("");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="scenario">
      <h3>Scenario / add</h3>
      <h1>Add Scenario</h1>
      <form className="scenario-form" onSubmit={handleSubmit}>
        <div className="form-input">
          <div className="name-div div-inputs">
            <h4>Scenario Name</h4>
            <input
              type="text"
              placeholder="Scenario Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="scenario-name"
            />
          </div>
          <div className="time-div div-inputs">
            <h4>Scenario Time (seconds)</h4>
            <input
              type="number"
              placeholder="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="scenario-time"
            />
          </div>
        </div>
        <div className="form-buttons">
          <button className="scenario-add" type="submit">
            Add
          </button>
          <button
            className="scenario-reset"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="scenario-back"
            type="button"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddScenario;
