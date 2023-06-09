import { useState } from "react";

/**
 * This is the main component of the game. It is the entry point for the game.import { useUserId, useContextId, useOption, useUserRationale, useAiResponse, useEmotion } from "./JSONGenerator";

/**
import Form from "./Form";
*/
const Game = () => {
  
  const [scene, setScene] = useState("Begin");
  const [result, setResult] = useState("");
  const [gameEnded, setGameEnded] = useState(false);
  const [showEndingPage, setShowEndingPage] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const handleChoice = (choice: string): void => {
    const newScene: string = scene;
    const newResult: string = `${scene}${choice}`;

    setResult(newResult);
    setHistory((prevHistory: string[]) => [...prevHistory, newResult]);

    if(scene == "Begin" && choice === "In Love"){
      setScene("In Love");
    }
    else if (scene == "Begin" && choice == "Angry"){
      setScene("Angry");
    }
    else if (scene == "In Love" && choice == "Talk To Jam"){
      setScene("Talk To Jam");
    }
    else if (scene == "In Love" && choice == "Clean Her Home"){
      setScene("Clean Her Home");
    }
    else if (scene == "Angry" && choice == "Jan Gets Better"){
      setScene("Jan Gets Better");
    }
    else if (scene == "Angry" && choice == "Appreciates"){
      setScene("Appreciates");
    }
    else if (scene == "Talk To Jam" && choice == "Ignored"){
      setScene("Ignored");
    }
    else if (scene == "Talk To Jam" && choice == "Loved_Talk To Jan"){
      setScene("Loved_Talk To Jan");
    }
    else if (scene == "Clean Her Home" && choice == "Loved_Clean Her Home"){
      setScene("Loved_Clean Her Home");
    }
    else if (scene == "Clean Her Home" && choice == "Detached"){
      setScene("Detached");
    }




    // Check if an ending is reached
    if (newScene >= 3 && newScene <= 10) {
      setGameEnded(true);
      setShowEndingPage(true);
    }
  };


  const downloadHistory = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(history, null, 2)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "game_history.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const submitButtonStyle = {
    marginTop: "-100px", // Adjust the marginTop value to move the button up
  };
  const renderScene = () => {
    switch (scene) {
        
        default:
        return null;
    }
  };

  const renderEndingPage = () => {
    return (
      <div>
        <h1>Thank You!</h1>
        <p>
          Thank you for playing the game. Please save your game history for
          future reference.
        </p>
        <button onClick={downloadHistory}>Download History</button>
      </div>
    );
  };

  return (
    <div className="game">
      {showEndingPage ? (
        renderEndingPage()
      ) : (
        <>
          <h1>Relationship Game</h1>
          {renderScene()}
          {result && <p>Result: {result}</p>}
          {gameEnded && <p>Game Ended</p>}
        </>
      )}
    </div>
  );
};

// export default Game;

export default Game;
