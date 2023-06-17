import { useState } from 'react';

const useDivID = ():[number, React.Dispatch<React.SetStateAction<number>>] => {
  const [emotion, setEmotion] = useState<number>(1);

  return [emotion, setEmotion];
};

export default useDivID;
