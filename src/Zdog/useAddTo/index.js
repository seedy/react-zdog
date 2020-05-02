import { useContext } from 'react';

import { ParentContext } from 'Zdog/Context/Parent/with';

export default () => {
  const parentRef = useContext(ParentContext);

  return parentRef;
};
