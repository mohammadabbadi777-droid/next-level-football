import { useState } from "react";

export default function NextLevelFootball() {
  const [position, setPosition] = useState("");
  const [energy, setEnergy] = useState(5);
  const [fatigue, setFatigue] = useState(5);
  const [training, setTraining] = useState("");
  const [match, setMatch] = useState("");
  const [weakness, setWeakness] = useState("");
  const [plan, setPlan] = useState("");

  const generatePlan = () => {
    let result = "AI Performance Plan:\n\n";

    if (energy >= 7) {
      result += "High intensity training\n";
    } else {
      result += "Technical skill training\n";
    }

    if (fatigue >= 7) {
      result += "Recovery session recommended\n";
    }

    if (position === "LW") {
      result += "Focus on cutting inside and 1v1 situations\n";
    }

    if (position === "RW") {
      result += "Focus on crossing and inside dribbling\n";
    }

    if (weakness) {
      result += `Improve ${weakness} with focused drills\n`;
    }

    setPlan(result);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold text-green-400 mb-2">
        Next Level Football
      </h1>

      <p className="mb-8 text-gray-300">
        AI Football Development Platform
      </p>

      {/* Position */}
      <div className="mb-8">
        <h2 className="text-2xl mb-3">Choose Position</h2>

        <select
          className="p-2 text-black"
          onChange={(e) => setPosition(e.target.value)}
        >
          <option>Select Position</option>
          <option value="LW">Left Winger</option>
          <option value="RW">Right Winger</option>
        </select>
      </div>

      {/* Tactical Field */}
      <div className="mb-8">
        <h2 className="text-2xl mb-3">Virtual Tactical Field</h2>

        <div className="bg-green-900 h-64 rounded flex items-center justify-center">

          {position === "LW" && (
            <div>
              <p>LW Tactical Movements</p>
              <p>• Stay Wide</p>
              <p>• Cut Inside</p>
              <p>• Attack Back Post</p>
            </div>
          )}

          {position === "RW" && (
            <div>
              <p>RW Tactical Movements</p>
              <p>• Stretch Defense</p>
              <p>• Dribble Inside</p>
              <p>• Cross</p>
            </div>
          )}

        </div>
      </div>

      {/* Daily Check */}
      <div className="mb-8">
        <h2 className="text-2xl mb-3">Daily Check-In</h2>

        <label>Energy</label>
        <input
          type="range"
          min="1"
          max="10"
          className="block mb-3"
          onChange={(e) => setEnergy(Number(e.target.value))}
        />

        <label>Fatigue</label>
        <input
          type="range"
          min="1"
          max="10"
          className="block mb-3"
          onChange={(e) => setFatigue(Number(e.target.value))}
        />

      </div>

      {/* Weakness */}
      <div className="mb-8">
        <h2 className="text-2xl mb-3">Improve Weakness</h2>

        <select
          className="p-2 text-black"
          onChange={(e) => setWeakness(e.target.value)}
        >
          <option>Select Weakness</option>
          <option>Speed</option>
          <option>Dribbling</option>
          <option>Shooting</option>
          <option>Decision Making</option>
        </select>
      </div>

      <button
        className="bg-green-400 text-black px-6 py-3 rounded"
        onClick={generatePlan}
      >
        Generate AI Plan
      </button>

      {plan && (
        <div className="mt-8 bg-gray-900 p-6 rounded">
          <h2 className="text-2xl text-green-400 mb-3">
            Your AI Plan
          </h2>
          <pre>{plan}</pre>
        </div>
      )}
    </div>
  );
}
