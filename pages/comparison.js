import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const playerProfiles = {
  "Left Winger": {
    pro: "Eden Hazard",
    type: "Technical Dribbler",
    description:
      "Like Hazard, you thrive in tight spaces, relying on low center of gravity, quick feet, and creativity to beat defenders. Your game is built on close control and finding space between the lines.",
    strengths: ["Close control", "1v1 dribbling", "Creative passing", "Balance"],
    weaknesses: ["Aerial duels", "Defensive work rate", "Power shooting"],
    focusDrills: ["Cone slalom dribbling", "1v1 finishing", "Quick combination play"],
    icon: "🇧🇪",
  },
  "Right Winger": {
    pro: "Mohamed Salah",
    type: "Pacey Finisher",
    description:
      "Like Salah, your game combines pace with a deadly cutting movement onto your stronger foot. You create danger by running in behind and finishing efficiently inside the box.",
    strengths: ["Pace", "Cutting inside", "Clinical finishing", "Work rate"],
    weaknesses: ["Weak foot", "Hold-up play", "Aerial ability"],
    focusDrills: ["Sprint & finish drills", "Weak foot training", "Inside-cut shooting"],
    icon: "🇪🇬",
  },
  Striker: {
    pro: "Erling Haaland",
    type: "Clinical Striker",
    description:
      "Like Haaland, your game is built around explosive movement, clinical finishing, and positioning in the box. You make runs that defenders struggle to track.",
    strengths: ["Finishing", "Positioning", "Aerial ability", "Speed"],
    weaknesses: ["Link-up play", "Dribbling", "Pressing from front"],
    focusDrills: ["Box finishing", "Aerial heading", "Movement off the ball"],
    icon: "🇳🇴",
  },
  "Attacking Midfielder": {
    pro: "Kevin De Bruyne",
    type: "Creative Playmaker",
    description:
      "Like De Bruyne, your vision and passing range make you a threat from deep. You read the game at the highest level and can unlock defenses with a single pass.",
    strengths: ["Vision", "Long passing", "Shooting", "Work rate"],
    weaknesses: ["Dribbling under pressure", "Pace", "Heading"],
    focusDrills: ["Long pass accuracy", "Shooting from range", "Combination play"],
    icon: "🇧🇪",
  },
  "Central Midfielder": {
    pro: "Jude Bellingham",
    type: "Box-to-Box Runner",
    description:
      "Like Bellingham, you dominate both ends of the pitch. Your engine, technical quality, and ability to arrive late into the box make you a complete midfielder.",
    strengths: ["Stamina", "Box arrivals", "Pressing", "Physicality"],
    weaknesses: ["Final third decision making", "Weak foot"],
    focusDrills: ["Late runs into box", "Pressing patterns", "Transition play"],
    icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  },
  "Defensive Midfielder": {
    pro: "Rodri",
    type: "Deep-lying Builder",
    description:
      "Like Rodri, you control the tempo from deep. Your positioning, reading of the game, and ability to switch the ball make you the engine of the team's build-up.",
    strengths: ["Positioning", "Passing range", "Interceptions", "Composure"],
    weaknesses: ["Pace", "Dribbling", "Box-to-box mobility"],
    focusDrills: ["Scanning drills", "Long switching passes", "Pressing triggers"],
    icon: "🇪🇸",
  },
  "Left Back": {
    pro: "Andrew Robertson",
    type: "Overlapping Runner",
    description:
      "Like Robertson, your attacking intent and engine define your game. You overlap constantly, deliver dangerous crosses, and work tirelessly both in and out of possession.",
    strengths: ["Crossing", "Overlapping runs", "Stamina", "Defending 1v1"],
    weaknesses: ["Positioning when advanced", "Aerial duels"],
    focusDrills: ["Overlap + cross drills", "Recovery runs", "1v1 defending"],
    icon: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  },
  "Right Back": {
    pro: "Trent Alexander-Arnold",
    type: "Creative Fullback",
    description:
      "Like Trent, your ability to deliver from deep positions and read passing lanes makes you a unique attacking threat from fullback. Your delivery is your superpower.",
    strengths: ["Crossing", "Set pieces", "Passing range", "Vision"],
    weaknesses: ["Defending 1v1", "Pace", "Tracking runners"],
    focusDrills: ["Crossing accuracy", "Whipped deliveries", "Defensive recovery"],
    icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  },
  "Center Back": {
    pro: "Virgil van Dijk",
    type: "Commanding Defender",
    description:
      "Like Van Dijk, your presence dominates the defensive line. Your reading of danger, aerial ability, and composure on the ball make you a true leader at the back.",
    strengths: ["Aerial duels", "Positioning", "Composure", "Leadership"],
    weaknesses: ["Pace in transition", "Ball carrying"],
    focusDrills: ["Aerial dominance", "1v1 defending", "Playing out from back"],
    icon: "🇳🇱",
  },
  Goalkeeper: {
    pro: "Alisson Becker",
    type: "Sweeper Keeper",
    description:
      "Like Alisson, you combine shot-stopping with elite distribution. Your command of the box and ability to act as an extra defender outside the area sets you apart.",
    strengths: ["Shot stopping", "Distribution", "Commanding the box", "Sweeping"],
    weaknesses: ["Coming for crosses", "Kicking range"],
    focusDrills: ["Distribution under pressure", "Shot-stopping reflexes", "Sweeper positioning"],
    icon: "🇧🇷",
  },
};

const styleQuotes = {
  "Technical Dribbler": "Your dribbling is your art. Master the touch, master the space.",
  "Pacey Finisher": "Speed is your weapon. Use it to get in behind, stay clinical.",
  "Creative Playmaker": "Vision separates good players from great ones. See it before it happens.",
  "Box-to-Box Runner": "Your engine wins games. Never stop running.",
  "Commanding Defender": "Your presence is your dominance. Read it before it happens.",
  "Deep-lying Builder": "Control the tempo, control the game.",
  "Overlapping Runner": "The overlap is your secret weapon. Timing is everything.",
  "Creative Fullback": "Your delivery changes games. Own the wide areas.",
  "Sweeper Keeper": "You are the last line and the first attacker.",
  "Clinical Striker": "One chance. One touch. One goal. Be ruthless.",
};

export default function Comparison() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("nlf_profile");
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  if (!profile) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64 text-gray-400">
          Complete onboarding to see your comparison.
        </div>
      </Layout>
    );
  }

  const data = playerProfiles[profile.position] || playerProfiles["Left Winger"];
  const quote = styleQuotes[data.type] || "";

  return (
    <Layout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Your Playing Style</h1>
          <p className="text-gray-400">Based on your position and profile</p>
        </div>

        {/* Main Comparison Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-green-900 rounded-2xl p-7 mb-6">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-5xl">{data.icon}</span>
            <div>
              <p className="text-xs text-green-400 font-bold tracking-widest mb-1">YOU PLAY LIKE</p>
              <h2 className="text-2xl font-bold">{data.pro}</h2>
              <p className="text-gray-400">{data.type}</p>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-5">{data.description}</p>

          <div className="border-t border-gray-800 pt-5">
            <p className="text-green-400 font-semibold italic">"{quote}"</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Strengths */}
          <div className="bg-gray-900 border border-green-900 rounded-xl p-5">
            <p className="text-xs text-green-400 font-bold tracking-widest mb-3">YOUR STRENGTHS</p>
            <ul className="space-y-2">
              {data.strengths.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-gray-200">
                  <span className="text-green-400">✓</span> {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-gray-900 border border-red-900 rounded-xl p-5">
            <p className="text-xs text-red-400 font-bold tracking-widest mb-3">WORK ON</p>
            <ul className="space-y-2">
              {data.weaknesses.map((w) => (
                <li key={w} className="flex items-center gap-2 text-sm text-gray-200">
                  <span className="text-red-400">→</span> {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Drills */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-xs text-gray-500 tracking-widest mb-4">RECOMMENDED DRILLS FOR YOUR STYLE</p>
          <ul className="space-y-2">
            {data.focusDrills.map((drill, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-green-400 text-black flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-gray-200">{drill}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Style Badge */}
        <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
          <p className="text-xs text-gray-500 tracking-widest mb-2">YOUR STYLE TYPE</p>
          <span className="inline-block bg-green-400 text-black font-bold px-6 py-2 rounded-full text-sm">
            {data.type}
          </span>
          <p className="text-gray-500 text-xs mt-3">
            {profile.position} · {profile.skillLevel} · {profile.playingStyle}
          </p>
        </div>
      </div>
    </Layout>
  );
}
