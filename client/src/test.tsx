import React, { useState } from "react";
import useGameHistory from "./states/history";
import useRationale from "./states/rationale";
import useEmotion from "./states/emotion";
import useAIResponse from "./states/response";
import useOption from "./states/option";
import useGameEnded from "./states/end";
import useAgree from "./states/agree";
import useDivID from "./states/divID";
import fetchAIResponse from "./funcs/fetchAI";



const GameComponent: React.FC = () => {

  const [history, addHistory] = useGameHistory();
  const [rationale, setRationale] = useRationale();
  const [emotion, setEmotion] = useEmotion();
  const [aiResponse, setAIResponse] = useAIResponse();
  const [option, setOption] = useOption();
  const [gameEnded, setGameEnded] = useGameEnded();
  const [agree, setAgree] = useAgree();
  const [divID, setDivID] = useDivID();

  

  // Assuming that options are strings, you may need to adjust this
  const handleOptionSelect = async (selectedOption: string) => {
    setOption(selectedOption);
    // Logic to determine next context
    const aiResponse = await fetchAIResponse(divID, selectedOption);
    setAIResponse(aiResponse);
  };
  

  const handleSubmit = () => {
    addHistory(`div${divID}`, { option, rationale, emotion, agree });

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
        <button onClick={() => handleOptionSelect("A")}>A</button>
        <button onClick={() => handleOptionSelect("B")}>Option 2</button>
      </div>
      <div>
        <p>{aiResponse}</p>
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
        <textarea
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
        />
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
