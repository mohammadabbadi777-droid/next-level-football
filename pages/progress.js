import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const skillList = [
  "Dribbling",
  "Speed",
  "Shooting",
  "Passing",
  "Weak Foot",
  "Decision Making",
  "Positioning",
  "Heading",
];

const levelSystem = [
  { label: "Beginner", minAvg: 0, color: "text-gray-400" },
  { label: "Developing", minAvg: 5, color: "text-blue-400" },
  { label: "Advanced", minAvg: 7, color: "text-yellow-400" },
  { label: "Elite", minAvg: 9, color: "text-green-400" },
];

function getLevel(avg) {
  for (let i = levelSystem.length - 1; i >= 0; i--) {
    if (avg >= levelSystem[i].minAvg) return levelSystem[i];
  }
  return levelSystem[0];
}

function getBarColor(val) {
  if (val >= 8) return "bg-green-400";
  if (val >= 6) return "bg-yellow-400";
  if (val >= 4) return "bg-orange-400";
  return "bg-red-500";
}

function initSkills(profile) {
  const skills = {};
  for (const skill of skillList) {
    if (profile?.strengths?.includes(skill)) {
      skills[skill] = 7;
    } else if (profile?.weaknesses?.includes(skill)) {
      skills[skill] = 3;
    } else {
      skills[skill] = 5;
    }
  }
  return skills;
}

export default function Progress() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("nlf_profile");
    const p = stored ? JSON.parse(stored) : null;
    setProfile(p);

    const savedSkills = localStorage.getItem("nlf_skills");
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    } else if (p) {
      const init = initSkills(p);
      setSkills(init);
      localStorage.setItem("nlf_skills", JSON.stringify(init));
    }
  }, []);

  const startEdit = () => {
    setDraft({ ...skills });
    setEditing(true);
  };

  const saveEdit = () => {
    setSkills(draft);
    localStorage.setItem("nlf_skills", JSON.stringify(draft));
    setEditing(false);
  };

  if (!skills) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">Loading your progress...</p>
        </div>
      </Layout>
    );
  }

  const avg = Math.round(
    Object.values(skills).reduce((a, b) => a + b, 0) / skillList.length
  );
  const level = getLevel(avg);

  const sorted = [...skillList].sort((a, b) => (skills[b] || 0) - (skills[a] || 0));
  const top = sorted.slice(0, 3);
  const bottom = sorted.slice(-3).reverse();

  return (
    <Layout>
      <div className="max-w-2xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Progress</h1>
            <p className="text-gray-400">Track your development over time</p>
          </div>
          <button
            onClick={editing ? saveEdit : startEdit}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              editing
                ? "bg-green-400 text-black"
                : "border border-gray-700 text-gray-300 hover:border-gray-500"
            }`}
          >
            {editing ? "Save" : "Update Skills"}
          </button>
        </div>

        {/* Level Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 tracking-widest mb-1">CURRENT LEVEL</p>
            <p className={`text-3xl font-bold ${level.color}`}>{level.label}</p>
            <p className="text-gray-400 text-sm mt-1">Average rating: {avg}/10</p>
          </div>
          <div className="text-5xl">{avg >= 9 ? "🏆" : avg >= 7 ? "⭐" : avg >= 5 ? "📈" : "💪"}</div>
        </div>

        {/* Top / Weak */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-900 border border-green-900 rounded-xl p-4">
            <p className="text-xs text-green-400 font-bold tracking-widest mb-3">TOP SKILLS</p>
            {top.map((sk) => (
              <div key={sk} className="flex justify-between text-sm py-1">
                <span className="text-gray-300">{sk}</span>
                <span className="text-green-400 font-bold">{skills[sk]}/10</span>
              </div>
            ))}
          </div>
          <div className="bg-gray-900 border border-red-900 rounded-xl p-4">
            <p className="text-xs text-red-400 font-bold tracking-widest mb-3">FOCUS AREAS</p>
            {bottom.map((sk) => (
              <div key={sk} className="flex justify-between text-sm py-1">
                <span className="text-gray-300">{sk}</span>
                <span className="text-red-400 font-bold">{skills[sk]}/10</span>
              </div>
            ))}
          </div>
        </div>

        {/* All Skills */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <p className="text-xs text-gray-500 tracking-widest mb-5">ALL SKILLS</p>
          <div className="space-y-4">
            {skillList.map((skill) => {
              const val = editing ? (draft[skill] ?? 5) : (skills[skill] ?? 5);
              return (
                <div key={skill}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{skill}</span>
                    <span className="font-bold">{val}/10</span>
                  </div>
                  {editing ? (
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={val}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, [skill]: Number(e.target.value) }))
                      }
                      className="w-full accent-green-400"
                    />
                  ) : (
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${getBarColor(val)}`}
                        style={{ width: `${val * 10}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Level progression */}
        <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-xs text-gray-500 tracking-widest mb-4">LEVEL SYSTEM</p>
          <div className="flex gap-3">
            {levelSystem.map((l) => (
              <div
                key={l.label}
                className={`flex-1 text-center py-2 rounded-lg text-xs font-bold border ${
                  level.label === l.label
                    ? "border-green-400 bg-green-900/20"
                    : "border-gray-800 opacity-50"
                }`}
              >
                <p className={l.color}>{l.label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{l.minAvg}+ avg</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
