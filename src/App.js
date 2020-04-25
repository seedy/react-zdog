import React from 'react';

import Box from '@material-ui/core/Box';
import Illustration from './Zdog/Illustration';
import Ellipse from './Zdog/Ellipse';
import Shape from './Zdog/Shape';
import {TAU} from 'zdog';

// CONSTANTS
const ILLU_ROTATE = { y: TAU/8 };

const PATH = [
  { x: -40 }, // start at 1st point
  { x: 40 }, // line to 2nd point
];

const CHILD_ELLIPSE = {
  diameter: 20,
  quarters: 2,
  closed: true,
  translate: { z: 40 },
  scale: 1,
  stroke: 8,
  fill: true,
  color: 'eggplant',
};

// COMPONENTS
const App = () => {
  return (
    <Box height="100%" width="100%" display="flex" alignItems="center" justifyContent="center">
      <Illustration rotate={ILLU_ROTATE} dragRotate>
        <Ellipse 
          diameter={80}
          stroke={20}
          color="#636"
        >
          <Ellipse
            {...CHILD_ELLIPSE}
          >
            <Ellipse {...CHILD_ELLIPSE}/>
          </Ellipse>
        </Ellipse>
        <Shape
          path={PATH}
          stroke={20}
          color="#636"
        />
      </Illustration>
    </Box>
  );
}

export default App;
