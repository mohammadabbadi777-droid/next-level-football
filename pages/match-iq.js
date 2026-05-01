import { useState } from "react";
import Layout from "../components/Layout";

const scenarios = [
  {
    id: 1,
    situation: "You receive the ball on the wing. The defender is tight on you. Your striker is making a run in behind.",
    options: [
      { label: "Dribble past the defender", outcome: "risky" },
      { label: "Play the ball in behind for the striker", outcome: "best" },
      { label: "Pass back to the midfielder", outcome: "safe" },
      { label: "Shoot from distance", outcome: "poor" },
    ],
    best: 1,
    explanation:
      "Playing in behind the striker exploits the defensive line and creates a direct goal threat. Dribbling is high-risk in a tight space. Shooting from distance is low percentage.",
    tip: "Always scan for runners before you receive. If a striker is in behind, play early.",
  },
  {
    id: 2,
    situation: "You are a winger and your team is pressing. The opposition goalkeeper has the ball. Where do you position yourself?",
    options: [
      { label: "Stay wide on the wing", outcome: "poor" },
      { label: "Press the centre-back cutting off the pass lane", outcome: "best" },
      { label: "Stand near the halfway line", outcome: "poor" },
      { label: "Move centrally to receive a long ball", outcome: "safe" },
    ],
    best: 1,
    explanation:
      "In a high press, wingers should cut off the pass lane to the centre-back, forcing the goalkeeper to play long. Staying wide gives the opposition an easy outlet.",
    tip: "Your press angle matters more than your press speed. Block the pass, not the man.",
  },
  {
    id: 3,
    situation: "You are 1v1 with the goalkeeper after a through ball. He is rushing off his line. What do you do?",
    options: [
      { label: "Shoot immediately at full power", outcome: "risky" },
      { label: "Chip the goalkeeper", outcome: "best" },
      { label: "Take the ball round the goalkeeper", outcome: "safe" },
      { label: "Wait and dribble closer", outcome: "poor" },
    ],
    best: 1,
    explanation:
      "When a goalkeeper rushes out, a chip or lob is often the highest-percentage finish. Going round takes more time and the angle narrows. Waiting lets the goalkeeper close the gap.",
    tip: "Read the goalkeeper's momentum. If he's committed, chip. If he hesitates, go round.",
  },
  {
    id: 4,
    situation: "Your team is 1–0 up with 10 minutes left. The opposition is pushing forward. You win the ball in midfield.",
    options: [
      { label: "Play quickly forward to striker to counter", outcome: "best" },
      { label: "Dribble forward to waste time", outcome: "risky" },
      { label: "Play back to the goalkeeper", outcome: "safe" },
      { label: "Hold the ball under pressure", outcome: "poor" },
    ],
    best: 0,
    explanation:
      "Counter-attacking on transition is the best option — the opposition has pushed forward, leaving space in behind. A direct pass to the striker can seal the game.",
    tip: "When the opposition commits forward, the space behind them is your biggest weapon.",
  },
  {
    id: 5,
    situation: "You are pressing and your opponent is about to play a through ball to their winger. What do you do?",
    options: [
      { label: "Sprint toward the ball carrier", outcome: "risky" },
      { label: "Intercept the pass lane between them and the winger", outcome: "best" },
      { label: "Drop back to defend", outcome: "safe" },
      { label: "Wait and see if the pass is played", outcome: "poor" },
    ],
    best: 1,
    explanation:
      "Anticipating the pass and positioning in the lane is higher-percentage than sprinting at the ball carrier, who can simply play around you.",
    tip: "Reading the game means acting before the ball is played, not after.",
  },
];

const outcomeStyle = {
  best: "border-green-500 bg-green-900/30",
  safe: "border-yellow-600 bg-yellow-900/20",
  risky: "border-orange-600 bg-orange-900/20",
  poor: "border-red-700 bg-red-900/20",
};

export default function MatchIQ() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const scenario = scenarios[current];

  const choose = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === scenario.best) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 >= scenarios.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / scenarios.length) * 100);
    const level =
      pct >= 80 ? "Elite Decision Maker" : pct >= 60 ? "Developing IQ" : "Keep Practicing";
    return (
      <Layout>
        <div className="max-w-2xl">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">
            <p className="text-5xl mb-4">🧠</p>
            <h2 className="text-3xl font-bold mb-2">Session Complete</h2>
            <p className="text-gray-400 mb-6">Here's your Match IQ score</p>
            <div className="text-6xl font-bold text-green-400 mb-2">
              {score}/{scenarios.length}
            </div>
            <p className="text-xl text-gray-300 mb-8">{level}</p>
            <button
              onClick={restart}
              className="bg-green-400 text-black font-bold px-8 py-3 rounded-lg hover:bg-green-300 transition-colors"
            >
              Train Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Match IQ</h1>
            <p className="text-gray-400">Decision-based football scenarios</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-400">{score}</p>
            <p className="text-xs text-gray-500">correct</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-6">
          {scenarios.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i < current
                  ? "bg-green-400"
                  : i === current
                  ? "bg-green-800"
                  : "bg-gray-800"
              }`}
            />
          ))}
        </div>

        {/* Scenario */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-4">
          <p className="text-xs text-gray-500 tracking-widest mb-3">
            SCENARIO {current + 1} OF {scenarios.length}
          </p>
          <p className="text-lg leading-relaxed">{scenario.situation}</p>
        </div>

        {/* Options */}
        <div className="space-y-2 mb-4">
          {scenario.options.map((opt, i) => {
            const isSelected = selected === i;
            const isBest = i === scenario.best;
            const revealed = selected !== null;

            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={selected !== null}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all text-sm ${
                  revealed
                    ? isBest
                      ? outcomeStyle.best
                      : isSelected
                      ? "border-red-500 bg-red-900/30"
                      : "border-gray-800 opacity-50"
                    : "border-gray-700 hover:border-gray-500 bg-gray-900"
                }`}
              >
                <span className="font-medium">{opt.label}</span>
                {revealed && isBest && (
                  <span className="ml-2 text-green-400 font-bold">✓ Best</span>
                )}
                {revealed && isSelected && !isBest && (
                  <span className="ml-2 text-red-400 font-bold">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {selected !== null && (
          <div className="bg-gray-900 border border-green-900 rounded-xl p-5 mb-4">
            <p className="text-xs text-green-400 font-bold tracking-widest mb-2">AI EXPLANATION</p>
            <p className="text-gray-200 mb-3">{scenario.explanation}</p>
            <p className="text-sm text-green-400 font-semibold">💡 {scenario.tip}</p>
          </div>
        )}

        {selected !== null && (
          <button
            onClick={next}
            className="w-full bg-green-400 text-black font-bold py-3 rounded-xl hover:bg-green-300 transition-colors"
          >
            {current + 1 >= scenarios.length ? "See Results" : "Next Scenario →"}
          </button>
        )}
      </div>
    </Layout>
  );
}
