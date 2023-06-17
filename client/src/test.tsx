import React, { useState } from "react";

interface GameState {
  userid: string;
  context_id: number;
  division: {
    Option: string;
    user_rationale: string;
    emotion: string;
    Agree: boolean;
  }
}

const GameComponent: React.FC<{ userid: string }> = ({ userid }) => {
  const [contextId, setContextId] = useState<number>(0);
  const [option, setOption] = useState<string>("");
  const [rationale, setRationale] = useState<string>("");
  const [emotion, setEmotion] = useState<string>("");
  const [agree, setAgree] = useState<boolean>(false);

  const [history, setHistory] = useState<GameState[]>([]);

  // Assuming that options are strings, you may need to adjust this
  const handleOptionSelect = (selectedOption: string) => {
    setOption(selectedOption);
    // Logic to determine next context
    setContextId((prevContextId) => prevContextId + 1);
  };

  const handleSubmit = () => {
    // Create a new game state
    const newGameState: GameState = {
      userid,
      context_id: contextId,
      division: {
        Option: option,
        user_rationale: rationale,
        emotion,
        Agree: agree,
      },
    };
    // Add the new game state to the history
    setHistory((prevHistory) => [...prevHistory, newGameState]);
    // Clear current selections
    setOption("");
    setRationale("");
    setEmotion("");
    setAgree(false);
  };

  return (
    <div>
      {/* Render your game UI here, for example: */}
      <h1> Mind Clash</h1>
      <div>
        {/* Option selector */}
        {/* Update these options based on your game logic */}
        <button onClick={() => handleOptionSelect("A")}>
          A
        </button>
        <button onClick={() => handleOptionSelect("B")}>
          B
        </button>
      </div>
      <div>
        {/* Rationale input */}
        <textarea
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
        />
      </div>
      <div>
        {/* Emotion input */}
        <textarea value={emotion} onChange={(e) => setEmotion(e.target.value)} />
      </div>
      <div>
        {/* Agree checkbox */}
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default GameComponent;
