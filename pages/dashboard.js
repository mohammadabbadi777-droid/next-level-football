import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";

const proComparisons = {
  "Left Winger": { name: "Eden Hazard", trait: "Technical Dribbler" },
  "Right Winger": { name: "Mohamed Salah", trait: "Pacey Finisher" },
  Striker: { name: "Erling Haaland", trait: "Clinical Striker" },
  "Attacking Midfielder": { name: "Kevin De Bruyne", trait: "Creative Playmaker" },
  "Central Midfielder": { name: "Jude Bellingham", trait: "Box-to-Box Runner" },
  "Defensive Midfielder": { name: "Rodri", trait: "Deep-lying Builder" },
  "Left Back": { name: "Andrew Robertson", trait: "Overlapping Runner" },
  "Right Back": { name: "Trent Alexander-Arnold", trait: "Creative Fullback" },
  "Center Back": { name: "Virgil van Dijk", trait: "Commanding Defender" },
  Goalkeeper: { name: "Alisson Becker", trait: "Sweeper Keeper" },
};

const weeklySchedule = [
  { day: "Monday", focus: "Recovery + Light Ball Work", intensity: "Low" },
  { day: "Tuesday", focus: "Speed + Dribbling", intensity: "High" },
  { day: "Wednesday", focus: "Tactical + Passing", intensity: "Medium" },
  { day: "Thursday", focus: "Strength + Conditioning", intensity: "High" },
  { day: "Friday", focus: "Match Simulation", intensity: "Medium" },
  { day: "Saturday", focus: "High Intensity Training", intensity: "High" },
  { day: "Sunday", focus: "Recovery", intensity: "Low" },
];

const intensityColor = {
  Low: "text-blue-400",
  Medium: "text-yellow-400",
  High: "text-red-400",
};

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("nlf_profile");
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  if (!profile) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64 flex-col gap-4">
          <p className="text-gray-400">No profile found.</p>
          <Link href="/" className="bg-green-400 text-black px-6 py-2 rounded-lg font-bold">
            Start Onboarding
          </Link>
        </div>
      </Layout>
    );
  }

  const pro = proComparisons[profile.position] || { name: "Lionel Messi", trait: "Complete Player" };
  const todayName = days[new Date().getDay()];
  const todayTraining = weeklySchedule.find((d) => d.day === todayName) || weeklySchedule[0];

  const coachMessage =
    profile.weaknesses?.length > 0
      ? `Focus on your ${profile.weaknesses[0].toLowerCase()} today. Stay disciplined and track every rep. Progress is built in the details.`
      : "Stay consistent and push your limits today. Every session counts on your journey to the next level.";

  return (
    <Layout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-gray-500 text-sm">Good session,</p>
          <h1 className="text-3xl font-bold">
            {profile.position} · {profile.skillLevel}
          </h1>
        </div>

        {/* AI Coach Message */}
        <div className="bg-green-400 text-black rounded-xl p-6 mb-6">
          <p className="text-xs font-bold tracking-widest mb-2">⚡ AI COACH MESSAGE</p>
          <p className="text-lg font-semibold leading-relaxed">{coachMessage}</p>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Today's Training */}
          <Link href="/training" className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-green-400 transition-colors">
            <p className="text-xs text-gray-500 tracking-widest mb-2">TODAY'S TRAINING</p>
            <p className="text-xl font-bold mb-1">{todayTraining.focus}</p>
            <p className={`text-sm font-semibold ${intensityColor[todayTraining.intensity]}`}>
              {todayTraining.intensity} Intensity
            </p>
          </Link>

          {/* Player Style */}
          <Link href="/comparison" className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-green-400 transition-colors">
            <p className="text-xs text-gray-500 tracking-widest mb-2">YOUR STYLE</p>
            <p className="text-xl font-bold mb-1">{pro.name}-type</p>
            <p className="text-sm text-gray-400">{pro.trait}</p>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Main Weakness */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-xs text-gray-500 tracking-widest mb-2">MAIN WEAKNESS</p>
            <p className="text-lg font-bold text-red-400">
              {profile.weaknesses?.[0] || "—"}
            </p>
            <p className="text-xs text-gray-500 mt-1">Focus area</p>
          </div>

          {/* Match IQ */}
          <Link href="/match-iq" className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-green-400 transition-colors">
            <p className="text-xs text-gray-500 tracking-widest mb-2">MATCH IQ</p>
            <p className="text-lg font-bold">🧠 Train</p>
            <p className="text-xs text-gray-500 mt-1">Decision scenarios</p>
          </Link>

          {/* Progress */}
          <Link href="/progress" className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-green-400 transition-colors">
            <p className="text-xs text-gray-500 tracking-widest mb-2">PROGRESS</p>
            <p className="text-lg font-bold text-green-400">📈 Track</p>
            <p className="text-xs text-gray-500 mt-1">Weekly improvement</p>
          </Link>
        </div>

        {/* Weekly Plan */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-xs text-gray-500 tracking-widest mb-4">WEEKLY TRAINING PLAN</p>
          <div className="space-y-2">
            {weeklySchedule.map((item) => (
              <div
                key={item.day}
                className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                  item.day === todayName ? "bg-green-400 text-black" : ""
                }`}
              >
                <span className={`text-sm font-semibold w-28 ${item.day === todayName ? "text-black" : "text-gray-400"}`}>
                  {item.day}
                </span>
                <span className={`text-sm flex-1 ${item.day === todayName ? "text-black font-bold" : "text-white"}`}>
                  {item.focus}
                </span>
                <span className={`text-xs font-bold ${item.day === todayName ? "text-black" : intensityColor[item.intensity]}`}>
                  {item.intensity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
