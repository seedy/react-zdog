import React from 'react';

import { GOLD, WHITE } from 'COLORS';

import Anchor from 'Zdog/Anchor';
import Group from 'Zdog/Group';
import Shape from 'Zdog/Shape';
import Cylinder from 'Zdog/Cylinder';

// CONSTANTS
const ARC_PATH = [
  { x: -40, y: -60 },
  { x: -40, y: -140 },
  {
    arc: [
      { x: 0, y: -200 },
      { x: 40, y: -140 },
    ],
  },
  { x: 40, y: -60 },
];

const BLOCK_PATH = [
  { x: -40, y: -80 },
  {
    arc: [
      { x: -80, y: -80 },
      { x: -80, y: -60 },
    ],
  },
  { x: -80, y: 60 },
  {
    arc: [
      { x: -80, y: 80 },
      { x: -40, y: 80 },
    ],
  },
  { x: 40, y: 80 },
  {
    arc: [
      { x: 80, y: 80 },
      { x: 80, y: 60 },
    ],
  },
  { x: 80, y: -60 },
  {
    arc: [
      { x: 80, y: -80 },
      { x: 40, y: -80 },
    ],
  },
];

// COMPONENTS
const Lock = (props) => (
  <Anchor {...props}>
    <Group>
      <Shape
        path={ARC_PATH}
        color={GOLD}
        stroke={20}
        // translate={{ y: -20 }}
      />
      <Shape
        path={BLOCK_PATH}
        color={GOLD}
        fill
        stroke={40}
      />
      <Cylinder
        diameter={40}
        length={40}
        fill
        color={GOLD}
        backface={WHITE}
      />
    </Group>
  </Anchor>
);

export default Lock;
