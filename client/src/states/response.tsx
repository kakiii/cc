import { useState } from 'react';

const useAIResponse = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [aiResponse, setAIResponse] = useState<string>("");

  return [aiResponse, setAIResponse];
};

export default useAIResponse;
