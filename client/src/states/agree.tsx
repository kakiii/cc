import { useState } from 'react';

const useAgree = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [agree, setAgree] = useState<boolean>(false);

  return [agree, setAgree];
};

export default useAgree;
