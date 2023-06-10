import { useState } from "react";

const JSONGenerator = () => {
  const [userid, setUserId] = useState("");
  const [contextId, setContextId] = useState("");
  const [option, setOption] = useState("");
  const [userRationale, setUserRationale] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [emotion, setEmotion] = useState("");
  const [generatedJSON, setGeneratedJSON] = useState("");

  
  const generateJSON = () => {
    const data = {
      userid,
      context_id: contextId,
      division: {
        div01: {
          Option: option,
          user_rationale: userRationale,
          ai_response: aiResponse,
          emotion,
        },
      },
    };

    const jsonData = JSON.stringify(data, null, 2);
    setGeneratedJSON(jsonData);
  };

  
};
export const useUserId = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [userid, setUserId] = useState("");

  return [userid, setUserId];
};

export const useContextId = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [contextId, setContextId] = useState("");

  return [contextId, setContextId];
};

export const useOption = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [option, setOption] = useState("");

  return [option, setOption];
};

export const useUserRationale = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [userRationale, setUserRationale] = useState("");

  return [userRationale, setUserRationale];
};

export const useAiResponse = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [aiResponse, setAiResponse] = useState("");

  return [aiResponse, setAiResponse];
};

export const useEmotion = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [emotion, setEmotion] = useState("");

  return [emotion, setEmotion];
};

export default JSONGenerator;
