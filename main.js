import React, { useState } from 'https://esm.sh/react';
import { createRoot } from 'https://esm.sh/react-dom/client';

function App() {
  const [answer, setAnswer] = useState(generateAnswer());
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  function generateAnswer() {
    const digits = [];
    while (digits.length < 3) {
      const rand = Math.floor(Math.random() * 10);
      if (!digits.includes(rand)) digits.push(rand);
    }
    return digits.join("");
  }

  function checkGuess(guess) {
    let hits = 0, blows = 0;
    [...guess].forEach((d, i) => {
      if (d === answer[i]) hits++;
      else if (answer.includes(d)) blows++;
    });
    return { hits, blows };
  }

  function handleGuess() {
    const result = checkGuess(input);
    const newEntry = `${input} → ${result.hits} HIT / ${result.blows} BLOW`;
    const newHistory = [...history, newEntry];
    setHistory(newHistory);
    if (result.hits === 3) setIsCorrect(true);
    setInput("");
  }

  function restartGame() {
    setAnswer(generateAnswer());
    setHistory([]);
    setIsCorrect(false);
    setInput("");
  }

  return (
    <div>
      <h1>ヒットアンドブロー</h1>
      <p>3桁の数字を当てよう！重複なしだよ</p>
      <input value={input} maxLength={3} onChange={e => setInput(e.target.value)} />
      <button onClick={handleGuess}>推理！</button>
      <ul>{history.map((h, i) => <li key={i}>{h}</li>)}</ul>
      {isCorrect && <>
        <p>正解！おめでとう！</p>
        <img src="congrats.gif" className="congrats visible" />
        <br /><button onClick={restartGame}>もう1回遊ぶ！</button>
      </>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);