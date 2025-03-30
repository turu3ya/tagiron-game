import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [answer, setAnswer] = React.useState(generateAnswer());
  const [input, setInput] = React.useState("");
  const [log, setLog] = React.useState([]);

  function generateAnswer() {
    const digits = [];
    while (digits.length < 3) {
      const rand = Math.floor(Math.random() * 10);
      if (!digits.includes(rand)) digits.push(rand);
    }
    return digits;
  }

  function checkGuess() {
    if (input.length !== 3 || new Set(input).size !== 3) return;
    const guess = input.split("").map(Number);
    let hit = 0, blow = 0;
    guess.forEach((num, idx) => {
      if (num === answer[idx]) hit++;
      else if (answer.includes(num)) blow++;
    });
    const result = `${input} → ${hit} HIT / ${blow} BLOW`;
    setLog([...log, result]);
    if (hit === 3) {
      setLog([...log, result, "正解！おめでとう！"]);
    }
    setInput("");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>タギロン風ゲーム</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={3}
        placeholder="例: 123"
      />
      <button onClick={checkGuess}>推理！</button>
      <ul>
        {log.map((entry, idx) => (
          <li key={idx}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);