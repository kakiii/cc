import { useState } from 'react';

const useEmotion = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [emotion, setEmotion] = useState<string>("");

  return [emotion, setEmotion];
};

export default useEmotion;
