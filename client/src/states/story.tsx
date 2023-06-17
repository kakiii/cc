import { useState } from 'react';

const useStory = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [story, setStory] = useState<string>("");

  return [story, setStory];
};

export default useStory;