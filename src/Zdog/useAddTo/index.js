import {useContext} from 'react';

import {ParentContext} from '../Context/Parent/with';

export default () => {
  const parentRef = useContext(ParentContext);

  return parentRef;
}