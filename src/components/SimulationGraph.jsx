import React, { useState, useEffect } from "react";

const SimulationGraph = ({ scenario, vehicles, running }) => {
  const [vehiclePositions, setVehiclePositions] = useState([]);

  useEffect(() => {
    let intervalId;

    const initializePositions = () => {
      const initialPositions = vehicles.map((vehicle) => ({
        ...vehicle,
        x: parseFloat(vehicle.initialPositionX),
        y: parseFloat(vehicle.initialPositionY),
      }));
      setVehiclePositions(initialPositions);
    };

    if (running && scenario && vehicles.length) {
      initializePositions();

      intervalId = setInterval(() => {
        setVehiclePositions((prevPositions) =>
          prevPositions.map((vehicle) => {
            let { x, y, speed, direction } = vehicle;
            switch (direction) {
              case "Towards":
                x += speed;
                break;
              case "Backwards":
                x -= speed;
                break;
              case "Upwards":
                y -= speed;
                break;
              case "Downwards":
                y += speed;
                break;
              default:
                break;
            }
            return { ...vehicle, x, y };
          })
        );
      }, 1000);
    } else if (!running) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [running, scenario, vehicles]);

  const toSvgX = (x) => 50 + (x / 100) * 500;
  const toSvgY = (y) => 350 - (y / 100) * 300;

  return (
    <div>
      <div
        className="main-container"
        style={{ marginLeft: "300px", marginTop: "20px" }}
      >
        <svg width="600" height="400" style={{ backgroundColor: "black" }}>
          <line x1="50" y1="350" x2="550" y2="350" stroke="green" />
          <line x1="50" y1="50" x2="50" y2="350" stroke="green" />
          {[...Array(6).keys()].map((i) => (
            <g key={i}>
              <line
                x1="50"
                y1={50 + i * 50}
                x2="550"
                y2={50 + i * 50}
                stroke="green"
              />
            </g>
          ))}
          {[...Array(9).keys()].map((i) => (
            <g key={i}>
              <line
                x1={50 + (i + 1) * 50}
                y1="50"
                x2={50 + (i + 1) * 50}
                y2="350"
                stroke="green"
              />
            </g>
          ))}
          <line x1="550" y1="50" x2="550" y2="350" stroke="green" />
          {vehiclePositions.map((vehicle) => (
            <circle
              key={vehicle.id}
              cx={toSvgX(vehicle.x)}
              cy={toSvgY(vehicle.y)}
              r="5"
              fill="red"
              style={{ display: vehicle.hide ? "none" : "inherit" }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default SimulationGraph;
