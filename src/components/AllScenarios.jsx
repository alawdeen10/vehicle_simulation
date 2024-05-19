import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./css/AllScenarios.css";

const AllScenarios = () => {
  const [scenarios, setScenarios] = useState([]);
  const [vehicles, setVehicles] = useState([]);
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

    const fetchVehicles = async () => {
      try {
        const response = await api.get("/vehicles");
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchScenarios();
    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/scenarios/${id}`);
      if (response.status === 200) {
        setScenarios(scenarios.filter((scenario) => scenario.id !== id));
      } else {
        console.error("Failed to delete scenario:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting scenario:", error);
    }
  };

  const getVehicleCount = (scenarioId) => {
    return vehicles.filter((vehicle) => vehicle.scenarioId === scenarioId)
      .length;
  };

  const handleDeleteAll = async () => {
    try {
      await api.delete(`/scenarios`);
      setScenarios([]);
    } catch (error) {
      console.error("Error deleting all scenarios:", error);
    }
  };

  return (
    <div className="all-scenarios">
      <div className="header">
        <h2>All Scenarios</h2>
        <div className="buttons-container">
          <button
            onClick={() => navigate(`/add-scenario`)}
            className="new-scenario"
          >
            New Scenario
          </button>
          <button
            onClick={() => navigate(`/add-vehicle`)}
            className="add-vehicle"
          >
            Add Vehicle
          </button>
          <button onClick={handleDeleteAll} className="delete-all">
            Delete All
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Scenario Name</th>
            <th>Scenario Time</th>
            <th>Number of Vehicles</th>
            <th>No of vehicle</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario) => (
            <tr key={scenario.id} className="table-row">
              <td>{scenario.id}</td>
              <td>{scenario.name}</td>
              <td>{scenario.time}</td>
              <td>{getVehicleCount(scenario.id)}</td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/add-vehicle?scenarioId=${scenario.id}`)
                  }
                >
                  Add Vehicle
                </button>
              </td>
              <td>
                <button
                  onClick={() => navigate(`/edit-scenario/${scenario.id}`)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(scenario.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllScenarios;
