import React, { useState, useEffect } from "react";
import api from "../api";
import SimulationGraph from "./SimulationGraph";
import "./css/HomePage.css";

const HomePage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [running, setRunning] = useState(false);

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

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await api.get("/vehicles");
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  const handleStartSimulation = (scenarioId) => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    setSelectedScenario(scenario);
    setRunning(true);
  };

  const handleStopSimulation = () => {
    setRunning(false);
  };

  return (
    <div className="homepage">
      <div className="homepage-table">
        <div className="homepage-scenario">
          <select
            onChange={(e) => handleStartSimulation(parseInt(e.target.value))}
          >
            <option value="">Select Scenario</option>
            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.name}
              </option>
            ))}
          </select>
        </div>
        <div className="scenario-table">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Position X</th>
                <th>Position Y</th>
                <th>Speed</th>
                <th>Direction</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {vehicles
                .filter(
                  (vehicle) => vehicle.scenarioId === selectedScenario?.id
                )
                .map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td>{vehicle.id}</td>
                    <td>{vehicle.name}</td>
                    <td>{vehicle.initialPositionX}</td>
                    <td>{vehicle.initialPositionY}</td>
                    <td>{vehicle.speed}</td>
                    <td>{vehicle.direction}</td>
                    <td>
                      <button>Edit</button>
                    </td>
                    <td>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="simulation-controls">
          <button
            onClick={() => handleStartSimulation(selectedScenario?.id)}
            className="start-button"
          >
            Start Simulation
          </button>
          <button onClick={handleStopSimulation} className="stop-button">
            Stop Simulation
          </button>
        </div>
      </div>
      <div className="simulation-graph">
        {selectedScenario && (
          <SimulationGraph
            scenario={selectedScenario}
            vehicles={vehicles.filter(
              (v) => v.scenarioId === selectedScenario.id
            )}
            running={running}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
