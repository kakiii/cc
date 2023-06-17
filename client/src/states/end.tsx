import { useState } from 'react';

const useGameEnded = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  return [gameEnded, setGameEnded];
};

export default useGameEnded;
