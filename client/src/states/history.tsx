import { useState } from "react";

const generateUserId = (): string => {
    return Math.random().toString(36).substring(7);
  };
  

// Define an interface for the history data
// interface HistoryData {
//   option: string;
//   rationale: string;
//   emotion: string;
//   agree: boolean;
// }

// Custom hook for managing game history
const useGameHistory = () => {
  const [history, setHistory] = useState({
    userid: generateUserId(),
    context_id: 2,
    division: {},
  });

  const addHistory = (divID: string, historyItem: { option: string, rationale: string, emotion: string, agree: boolean }) => {
    setHistory((prevHistory) => {
      return {
        ...prevHistory,
        division: {
          ...prevHistory.division,
          [`div${divID}`]: {
            Option: historyItem.option,
            user_rationale: historyItem.rationale,
            emotion: historyItem.emotion,
            agreeAI: historyItem.agree,
          },
        },
      };
    });
  };


  return [history, addHistory] as const;
};

export default useGameHistory;
