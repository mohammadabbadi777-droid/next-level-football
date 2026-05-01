import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const weeklySchedule = [
  { day: "Monday", focus: "Recovery + Light Ball Work", intensity: "Low" },
  { day: "Tuesday", focus: "Speed + Dribbling", intensity: "High" },
  { day: "Wednesday", focus: "Tactical + Passing", intensity: "Medium" },
  { day: "Thursday", focus: "Strength + Conditioning", intensity: "High" },
  { day: "Friday", focus: "Match Simulation", intensity: "Medium" },
  { day: "Saturday", focus: "High Intensity Training", intensity: "High" },
  { day: "Sunday", focus: "Recovery", intensity: "Low" },
];

const drillsByWeakness = {
  Dribbling: [
    {
      name: "Cone Slalom",
      duration: "10 min",
      steps: [
        "Set up 10 cones in a line, 1m apart",
        "Dribble through at 70% pace, both feet",
        "Increase speed each rep",
        "Last 2 sets: full sprint",
      ],
    },
    {
      name: "1v1 Wall Dribble",
      duration: "8 min",
      steps: [
        "Stand 5m from wall",
        "Dribble at wall, cut left or right at last moment",
        "Simulate beating a defender",
        "Alternate direction each rep",
      ],
    },
  ],
  Speed: [
    {
      name: "Sprint Intervals",
      duration: "12 min",
      steps: [
        "Mark 30m distance",
        "Sprint at 100% — rest 30s",
        "Repeat 8 times",
        "Focus on driving knees high",
      ],
    },
    {
      name: "Acceleration Ladder",
      duration: "8 min",
      steps: [
        "Use agility ladder on ground",
        "Quick feet through ladder",
        "Sprint 10m out of ladder",
        "Repeat 10 times",
      ],
    },
  ],
  Shooting: [
    {
      name: "Finishing Drill",
      duration: "15 min",
      steps: [
        "Place ball 18 yards from goal",
        "Take 3 touches, then shoot",
        "Aim for corners",
        "Alternate feet every set",
      ],
    },
    {
      name: "One-touch Volleys",
      duration: "10 min",
      steps: [
        "Partner or wall: receive crosses",
        "One-touch volleys into goal",
        "Focus on clean contact",
        "20 reps each foot",
      ],
    },
  ],
  Passing: [
    {
      name: "Rondo Circle",
      duration: "10 min",
      steps: [
        "5 players in circle, 1 in middle",
        "Keep possession with 2-touch max",
        "Middle player tries to intercept",
        "Rotate after 5 minutes",
      ],
    },
    {
      name: "Long Pass Accuracy",
      duration: "8 min",
      steps: [
        "Mark two targets 30m apart",
        "Hit target with lofted pass",
        "Alternate feet",
        "10 reps each foot",
      ],
    },
  ],
  "Weak Foot": [
    {
      name: "Weak Foot Only",
      duration: "15 min",
      steps: [
        "All dribbling and passing: weak foot only",
        "No dominant foot touches",
        "Start slow, build confidence",
        "End with 5 weak foot shots",
      ],
    },
  ],
  "Decision Making": [
    {
      name: "Scanning Practice",
      duration: "10 min",
      steps: [
        "Receive ball with head up",
        "Before first touch: look left and right",
        "Call out position of teammates",
        "Play correct pass each time",
      ],
    },
  ],
  Positioning: [
    {
      name: "Shadow Play",
      duration: "12 min",
      steps: [
        "Study your position's movement patterns",
        "Walk through correct positioning without ball",
        "Focus on angles and space creation",
        "Repeat at pace",
      ],
    },
  ],
  Heading: [
    {
      name: "Heading Repetitions",
      duration: "10 min",
      steps: [
        "Partner throws ball at head height",
        "Head with forehead — not crown",
        "Aim for specific target",
        "20 reps standing, 10 jumping",
      ],
    },
  ],
};

const baseSession = [
  { phase: "Ball Mastery", duration: "10 min", desc: "Close control, quick touches, foundation work" },
  { phase: "Physical Work", duration: "15 min", desc: "Sprints, agility, and conditioning" },
  { phase: "Tactical Training", duration: "15 min", desc: "Position-specific movements and patterns" },
  { phase: "Decision Making", duration: "10 min", desc: "Scenario-based training for football IQ" },
  { phase: "Recovery", duration: "10 min", desc: "Stretching and cool-down" },
];

const intensityColor = {
  Low: "bg-blue-900 text-blue-300",
  Medium: "bg-yellow-900 text-yellow-300",
  High: "bg-red-900 text-red-300",
};

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Training() {
  const [profile, setProfile] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("nlf_profile");
    if (stored) setProfile(JSON.parse(stored));
    const todayName = days[new Date().getDay()];
    const idx = weeklySchedule.findIndex((d) => d.day === todayName);
    setSelectedDay(idx >= 0 ? idx : 0);
  }, []);

  const weakness = profile?.weaknesses?.[0];
  const focusDrills = weakness && drillsByWeakness[weakness] ? drillsByWeakness[weakness] : [];

  return (
    <Layout>
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Training Plan</h1>
          <p className="text-gray-400">Daily & Weekly schedule tailored to your profile</p>
        </div>

        {/* Weekly tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {weeklySchedule.map((item, i) => (
            <button
              key={item.day}
              onClick={() => setSelectedDay(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                selectedDay === i
                  ? "bg-green-400 text-black"
                  : "bg-gray-900 border border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              {item.day.slice(0, 3)}
            </button>
          ))}
        </div>

        {selectedDay !== null && (
          <>
            {/* Selected Day Overview */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-xl font-bold">{weeklySchedule[selectedDay].day}</h2>
                  <p className="text-gray-400">{weeklySchedule[selectedDay].focus}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${intensityColor[weeklySchedule[selectedDay].intensity]}`}>
                  {weeklySchedule[selectedDay].intensity} Intensity
                </span>
              </div>
            </div>

            {/* Session Breakdown */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 tracking-widest mb-3">SESSION BREAKDOWN</p>
              <div className="space-y-2">
                {baseSession.map((phase) => (
                  <div key={phase.phase} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-16 text-center">
                      <p className="text-green-400 font-bold text-sm">{phase.duration}</p>
                    </div>
                    <div>
                      <p className="font-semibold">{phase.phase}</p>
                      <p className="text-gray-400 text-sm">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weakness-focused drills */}
            {focusDrills.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 tracking-widest mb-3">
                  WEAKNESS DRILLS · {weakness?.toUpperCase()}
                </p>
                <div className="space-y-4">
                  {focusDrills.map((drill) => (
                    <div key={drill.name} className="bg-gray-900 border border-green-900 rounded-xl p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-green-400">{drill.name}</h3>
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                          {drill.duration}
                        </span>
                      </div>
                      <ol className="space-y-1">
                        {drill.steps.map((step, i) => (
                          <li key={i} className="text-sm text-gray-300 flex gap-2">
                            <span className="text-green-400 font-bold">{i + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
