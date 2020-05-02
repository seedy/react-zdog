import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { GOLD, EGGPLANT } from 'COLORS';
import { TAU, Vector } from 'zdog';

import range from 'helpers/range';

import Shape from 'Zdog/Shape';
import Cylinder from 'Zdog/Cylinder';
import Anchor from 'Zdog/Anchor';
import Group from 'Zdog/Group';

// CONSTANTS
const ROTATE = { x: TAU / 4, y: TAU / 2 };
const ROTATE_BACKFACE = { y: TAU / 2 };
const TRANSLATE_FRONT = { z: -15 };
const TRANSLATE_BACK = { z: 15 };
const CYLINDER_LENGTH = TRANSLATE_FRONT.z - 1;
const TRANSLATE_CYLINDER = { z: CYLINDER_LENGTH / 2 };

const TOOTH_RATIO = 1.2;

// HELPERS
const makePath = (radius, teeth) => {
  const teethPointsCount = 4 * teeth;
  const teethPoints = range(0, teethPointsCount);
  return teethPoints.map((point) => {
    const isOuter = point % 4 < 2;
    const toothRadius = isOuter ? radius * TOOTH_RATIO : radius;
    const thetaAdjust = point % 2 ? -0.2 : 0.2;
    const theta = TAU * (
      (Math.ceil(point / 2) * 2 + thetaAdjust) / teethPointsCount
      + (1 / teethPointsCount)
    );
    return {
      x: Math.cos(theta) * toothRadius,
      y: Math.sin(theta) * toothRadius,
    };
  });
};

const makeFillPath = (path) => path.map((corner, index, list) => {
  const nextCorner = list[index + 1] || list[0];
  return {
    key: index,
    path: [
      new Vector(corner).add(TRANSLATE_FRONT),
      new Vector(corner).add(TRANSLATE_BACK),
      new Vector(nextCorner).add(TRANSLATE_BACK),
      new Vector(nextCorner).add(TRANSLATE_FRONT),
    ],
    color: index % 2 ? GOLD : EGGPLANT,
    fill: true,
  };
});

// COMPONENTS
const Gear = ({
  radius, stroke, teeth, ...rest
}) => {
  const path = useMemo(
    () => makePath(radius, teeth),
    [radius, teeth],
  );

  const fillPath = useMemo(
    () => makeFillPath(path),
    [path],
  );

  const cylinderDiameter = useMemo(
    () => radius / 2,
    [radius],
  );

  return (
    <Anchor
      rotate={ROTATE}
      {...rest}
    >
      <Group
        translate={TRANSLATE_FRONT}
      >
        <Shape
          path={path}
          color={GOLD}
          fill
          stroke={stroke}
          closed={false}
        />
        <Cylinder
          diameter={cylinderDiameter}
          length={CYLINDER_LENGTH}
          color={EGGPLANT}
          translate={TRANSLATE_CYLINDER}
          fill
          stroke={1}
        />
      </Group>

      <Group
        translate={TRANSLATE_BACK}
        rotate={ROTATE_BACKFACE}
      >
        <Shape
          path={path}
          color={GOLD}
          fill
          stroke={stroke}
          closed={false}
        />
        <Cylinder
          diameter={cylinderDiameter}
          length={CYLINDER_LENGTH}
          color={EGGPLANT}
          translate={TRANSLATE_CYLINDER}
          fill
        />
      </Group>
      {fillPath.map((fillProps) => (
        <Shape {...fillProps} stroke={stroke} />
      ))}
    </Anchor>
  );
};

Gear.propTypes = {
  radius: PropTypes.number,
  teeth: PropTypes.number,
  stroke: PropTypes.number,
};

Gear.defaultProps = {
  radius: 60,
  teeth: 8,
  stroke: 1,
};

export default Gear;
