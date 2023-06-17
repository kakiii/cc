import { useState } from 'react';

const useRationale = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [rationale, setRationale] = useState<string>("");

  return [rationale, setRationale];
};

export default useRationale;
