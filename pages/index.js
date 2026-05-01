import { useState } from "react";
import { useRouter } from "next/router";

const steps = [
  {
    id: 1,
    title: "Welcome to Next Level Football",
    subtitle: "Let's build your player profile",
  },
  {
    id: 2,
    title: "Your Playing Style",
    subtitle: "Tell us how you play",
  },
  {
    id: 3,
    title: "Strengths & Weaknesses",
    subtitle: "Be honest — this is how we help you improve",
  },
];

const positions = [
  "Left Winger",
  "Right Winger",
  "Striker",
  "Attacking Midfielder",
  "Central Midfielder",
  "Defensive Midfielder",
  "Left Back",
  "Right Back",
  "Center Back",
  "Goalkeeper",
];

const skillLevels = ["Beginner", "Developing", "Advanced", "Elite"];

const playingStyles = [
  "Technical Dribbler",
  "Pacey Winger",
  "Creative Playmaker",
  "Box-to-Box Runner",
  "Target Man",
  "Deep-lying Builder",
];

const skillOptions = [
  "Dribbling",
  "Speed",
  "Shooting",
  "Passing",
  "Weak Foot",
  "Decision Making",
  "Positioning",
  "Heading",
];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    age: "",
    position: "",
    skillLevel: "",
    playingStyle: "",
    strengths: [],
    weaknesses: [],
  });

  const update = (key, value) => setProfile((p) => ({ ...p, [key]: value }));

  const toggleSkill = (key, skill) => {
    setProfile((p) => {
      const arr = p[key];
      return {
        ...p,
        [key]: arr.includes(skill)
          ? arr.filter((s) => s !== skill)
          : [...arr, skill],
      };
    });
  };

  const canProceed = () => {
    if (step === 1) return profile.age && profile.position;
    if (step === 2) return profile.skillLevel && profile.playingStyle;
    if (step === 3) return profile.weaknesses.length > 0;
    return true;
  };

  const finish = () => {
    localStorage.setItem("nlf_profile", JSON.stringify(profile));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8">
          <p className="text-green-400 font-bold text-sm tracking-widest mb-2">
            NEXT LEVEL FOOTBALL
          </p>
          <h2 className="text-3xl font-bold">{steps[step - 1].title}</h2>
          <p className="text-gray-400 mt-1">{steps[step - 1].subtitle}</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s.id <= step ? "bg-green-400" : "bg-gray-800"
              }`}
            />
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Age</label>
              <input
                type="number"
                min="13"
                max="25"
                placeholder="e.g. 17"
                value={profile.age}
                onChange={(e) => update("age", e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Position
              </label>
              <div className="grid grid-cols-2 gap-2">
                {positions.map((pos) => (
                  <button
                    key={pos}
                    onClick={() => update("position", pos)}
                    className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                      profile.position === pos
                        ? "bg-green-400 text-black border-green-400 font-semibold"
                        : "border-gray-700 text-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Skill Level
              </label>
              <div className="grid grid-cols-2 gap-2">
                {skillLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => update("skillLevel", level)}
                    className={`px-4 py-3 rounded-lg text-sm border transition-colors ${
                      profile.skillLevel === level
                        ? "bg-green-400 text-black border-green-400 font-semibold"
                        : "border-gray-700 text-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Playing Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {playingStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() => update("playingStyle", style)}
                    className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                      profile.playingStyle === style
                        ? "bg-green-400 text-black border-green-400 font-semibold"
                        : "border-gray-700 text-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Strengths (select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill("strengths", skill)}
                    className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                      profile.strengths.includes(skill)
                        ? "bg-green-400 text-black border-green-400 font-semibold"
                        : "border-gray-700 text-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Weaknesses (select at least 1)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill("weaknesses", skill)}
                    className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                      profile.weaknesses.includes(skill)
                        ? "bg-red-500 text-white border-red-500 font-semibold"
                        : "border-gray-700 text-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex-1 border border-gray-700 text-gray-300 py-3 rounded-lg hover:border-gray-500 transition-colors"
            >
              Back
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="flex-1 bg-green-400 text-black font-bold py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-300 transition-colors"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={finish}
              disabled={!canProceed()}
              className="flex-1 bg-green-400 text-black font-bold py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-300 transition-colors"
            >
              Generate My Plan ⚡
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
