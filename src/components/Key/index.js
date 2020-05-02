import React from 'react';

import { EGGPLANT, WHITE } from 'COLORS';

import Anchor from 'Zdog/Anchor';
import Group from 'Zdog/Group';
import Shape from 'Zdog/Shape';
import Ellipse from 'Zdog/Ellipse';
import Cylinder from 'Zdog/Cylinder';

// CONSTANTS
const TRANSLATE_SPHERE = { y: -80 };
const TRANSLATE_HOLE = { y: -20 };

const KEY_PATH = [
  { x: 20, y: -50 },
  { x: 20, y: 60 },
  { x: 0, y: 80 },
  { x: -12, y: 70 },
  { x: -12, y: 50 },
  { x: -8, y: 44 },
  { x: -20, y: 34 },
  { x: -8, y: 24 },
  { x: -20, y: 14 },
  { x: -20, y: -4 },
  { x: -8, y: -12 },
  { x: -20, y: -20 },
  { x: -20, y: -50 },
];

const HOLE_PATH = [
  { x: 12, y: -40 },
  { x: 12, y: 60 },
];

// COMPONENTS
const Key = (props) => (
  <Anchor {...props}>
    <Group>
      <Shape
        path={KEY_PATH}
        color={EGGPLANT}
        fill
        stroke={5}
      />
      <Shape
        path={HOLE_PATH}
        color={WHITE}
        stroke={5}
      />
      <Ellipse
        diameter={80}
        fill
        color={EGGPLANT}
        translate={TRANSLATE_SPHERE}
        stroke={5}
      >
        <Cylinder
          diameter={20}
          fill
          color={EGGPLANT}
          backface={WHITE}
          translate={TRANSLATE_HOLE}
          length={2}
        />
      </Ellipse>

    </Group>
  </Anchor>
);

export default Key;
