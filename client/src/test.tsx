import React, { useState } from "react";
import storyData from "./data/2.json";

const GameComponent: React.FC = () => {
  const generateUserId = () => {
    // Generate a random user id
    return Math.random().toString(36).substring(7);
  };
  const [divID, setDivID] = useState<number>(1);
  const [option, setOption] = useState<string>("");
  const [rationale, setRationale] = useState<string>("");
  const [emotion, setEmotion] = useState<string>("");
  const [agree, setAgree] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [aiResponse, setAIResponse] = useState<string>("");
  const [history, setHistory] = useState<{
    userid: string;
    context_id: number;
    division: Record<
      string,
      {
        Option: string;
        user_rationale: string;
        //api_response: string;
        emotion: string;
        agreeAI: boolean;
      }
    >;
  }>({
    userid: generateUserId(),
    context_id: 1,
    division: {},
  });

  // Assuming that options are strings, you may need to adjust this
  const handleOptionSelect = async (selectedOption: string) => {
    setOption(selectedOption);
    // Logic to determine next context
    try {
      const queryParams = new URLSearchParams({
        scene: divID.toString(),
        choice: selectedOption,
      });
      const response = await fetch(`/chatgpt/response?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAIResponse(data.content.rationale);
      } else {
        throw new Error("Response not ok");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = () => {
    // const divName = `div+${divID}`;
    setHistory((prevHistory) => {
      return {
        ...prevHistory,
        division: {
          ...prevHistory.division,
          [`div${divID}`]: {
            Option: option,
            user_rationale: rationale,
            emotion: emotion,
            agreeAI: agree,
          },
        },
      };
    });

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
