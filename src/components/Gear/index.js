import React, {useMemo} from 'react';

import {GOLD, WHITE, EGGPLANT} from '../../COLORS';

import Cylinder from '../../Zdog/Cylinder';
import Box from '../../Zdog/Box';
import Group from '../../Zdog/Group';

const TRANSLATE_FRONT = {z: -15};
const TRANSLATE_BACK = {z: 15};

// COMPONENTS
const Gear = () => {

  return (
    <Group>
      <Cylinder
        color={EGGPLANT}
        frontface={GOLD}
        backface={GOLD}
        diameter={150}
        length={30}
        fill={true}
        stroke={false}
      />
      <Cylinder
        backface={WHITE}
        diameter={30}
        length={10}
        fill={true}
        stroke={false}
        translate={TRANSLATE_FRONT}
      />
      <Cylinder
        backface={WHITE}
        diameter={30}
        length={10}
        fill={true}
        stroke={false}
        translate={TRANSLATE_BACK}
      />
    </Group>
  );
}

export default Gear;