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
import StoryContent from "./Story";
import { handleOptionSelection } from "./funcs/handleOption";
// import useStoryStage from "./states/storyStage";


const GameComponent: React.FC = () => {

  const [history, addHistory] = useGameHistory();
  const [rationale, setRationale] = useRationale();
  const [emotion, setEmotion] = useEmotion();
  const [aiResponse, setAIResponse] = useAIResponse();
  const [option, setOption] = useOption();
  const [gameEnded, setGameEnded] = useGameEnded();
  const [agree, setAgree] = useAgree();
  const [divID, setDivID] = useDivID();
  const [stage, setStage] = useState<string>("-1");


  

  // Assuming that options are strings, you may need to adjust this
  const handleOptionSelect = async (selectedOption: string) => {
    // Update the selected option logic here
    
    setOption(selectedOption);
    const nextStage = handleOptionSelection(stage, selectedOption);
    console.log("option selected: " + selectedOption);
    console.log("curr stage: " + stage);
    console.log("next stage: " + nextStage);
    // update the AI response
    const response= await fetchAIResponse(String(parseInt(nextStage)+1), selectedOption);
    setAIResponse(response);
  };
  

  const handleSubmit = () => {
    addHistory(`div${divID}`, { option, rationale, emotion, agree });

    // Clear current selections
    setOption("");
    setRationale("");
    setEmotion("");
    setAIResponse("");
    setAgree(false);
  };

  return (
    <div>
      {/* Render your game UI here, for example: */}
      <h1> Mind Clash</h1>
      <StoryContent stage={stage} />
      <div>
        {/* Option selector */}
        {/* Update these options based on your game logic */}
        <button onClick={() => handleOptionSelect("A")}>A</button>
        <button onClick={() => handleOptionSelect("B")}>B</button>
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
