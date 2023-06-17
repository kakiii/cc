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

const GameComponent: React.FC = () => {
  const [history, addHistory] = useGameHistory();
  const [rationale, setRationale] = useRationale();
  const [emotion, setEmotion] = useEmotion();
  const [aiResponse, setAIResponse] = useAIResponse();
  const [option, setOption] = useOption();
  const [gameEnded, setGameEnded] = useGameEnded();
  const [agree, setAgree] = useAgree();
  const [divID, setDivID] = useDivID();

  const handleOptionSelect = async (selectedOption: string) => {
    setOption(selectedOption);
    const nextStage = handleOptionSelection(divID, selectedOption);
    if (nextStage > 4) {
      setGameEnded(true);
      return;
    } else {
      const response = await fetchAIResponse(nextStage, selectedOption);
      setAIResponse(response);
      // setDivID(nextStage);
    }
  };

  const handleSubmit = () => {
    if (!option) {
      alert("Please select option A or B before submitting.");
      return;
    }

    addHistory(`div${divID}`, { option, rationale, emotion, agree });

    setOption("");
    setRationale("");
    setEmotion("");
    setAIResponse("");
    setAgree(false);

    setDivID(handleOptionSelection(divID, option));
  };

  const renderGameContent = () => {
    if (divID > 4) {
      // Game has ended, render end message
      return (
        <>
          <StoryContent stage={divID} />
          <h4>Game Ended!</h4>
        </>
      );
    } else {
      // Game is still ongoing, render StoryContent and other elements
      return (
        <>
          <StoryContent stage={divID} />
          <div>
            <button onClick={() => handleOptionSelect("A")}>A</button>
            <button onClick={() => handleOptionSelect("B")}>B</button>
          </div>
          <div>
            <p>{aiResponse}</p>
          </div>
          <div>
            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
            />
          </div>
          <div>
            <textarea
              value={emotion}
              onChange={(e) => setEmotion(e.target.value)}
            />
          </div>
          <div>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </>
      );
    }
  };

  return <div>{renderGameContent()}</div>;
};

export default GameComponent;
