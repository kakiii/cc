import { useState } from 'react';

const useOption = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [option, setOption] = useState<string>("");

  return [option, setOption];
};

export default useOption;
