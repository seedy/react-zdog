import React, { useMemo } from 'react';
import PropTypes from 'prop-types';


import Anchor from '../../../Zdog/Anchor';
import Rect from '../../../Zdog/Rect';
import Shape from '../../../Zdog/Shape';
import Cylinder from '../../../Zdog/Cylinder';
import Hemisphere from '../../../Zdog/Hemisphere';

// COMPONENTS
const Door = ({diameter, stroke, scale}) => {
  const scaledDiameter = useMemo(
    () => diameter * scale,
    [diameter, scale],
  );

  const cylinderDiameter = useMemo(
    () => scaledDiameter * Math.pow(scale, 6),
    [scale, scaledDiameter],
  );

  const scaledStroke = useMemo(
    () => stroke * 2 * scale,
    [scale, stroke],
  );

  const translateJoints = useMemo(
    () => ({x: scaledDiameter / 2}),
    [scaledDiameter],
  );

  const translateTopJoint = useMemo(
    () => ({y: scaledDiameter / 4}),
    [scaledDiameter],
  );

  const translateBottomJoint = useMemo(
    () => ({ y: - scaledDiameter / 4}),
    [scaledDiameter],
  );

  const translateLegs = useMemo(
    () => ({y: diameter / 2}),
    [diameter],
  );

  const translateLeftLeg = useMemo(
    () => ({x: - 3 * diameter / 8}),
    [diameter],
  );

  const translateRightLeg = useMemo(
    () => ({x: 3 * diameter / 8}),
    [diameter],
  );

  const translateLock = useMemo(
    () => ({x: scaledDiameter / 4, z: 3 * scaledStroke / 4}),
    [scaledDiameter, scaledStroke],
  );

  const translateLockBasis = useMemo(
    () => ({z: -scaledStroke / 2}),
    [scaledStroke],
  );

  const translateHandle = useMemo(
    () => ({x: - scaledDiameter / 4}),
    [scaledDiameter],
  );

  const translateHandleSleeve = useMemo(
    () => ({z: 3 * scaledStroke / 4}),
    [scaledStroke],
  );

  const handlePath = useMemo(
    () => [
      {y: 0},
      {y: scaledDiameter / 4},
    ],
    [scaledDiameter],
  );

  return (
    <Rect
      width={scaledDiameter}
      height={scaledDiameter}
      fill
      color="white"
    >
      <Anchor translate={translateJoints}>
        <Rect
          fill
          color="white"
          width={10}
          height={25}
          translate={translateTopJoint}
        />
        <Rect
          fill
          color="white"
          width={10}
          height={25}
          translate={translateBottomJoint}
        />
      </Anchor>
      <Anchor translate={translateLegs}>
        <Rect
          fill
          color="#e32e73"
          width={diameter / 4}
          height={25}
          translate={translateRightLeg}
        />
        <Rect
          fill
          color="#e32e73"
          width={diameter / 4}
          height={25}
          translate={translateLeftLeg}
        />
      </Anchor>
      <Anchor translate={translateLock}>
        <Cylinder
          color="grey"
          diameter={cylinderDiameter * 2}
          length={scaledStroke / 4}
          translate={translateLockBasis}
          stroke={false}
        />
        <Cylinder
          diameter={cylinderDiameter}
          length={scaledStroke / 2}
          stroke={false}
        />
      </Anchor>
      <Anchor translate={translateHandle}>
        <Hemisphere
          diameter={cylinderDiameter}
          stroke={false}
        />
        <Shape
          stroke={scaledStroke / 2}
          path={handlePath}
          translate={translateHandleSleeve}
        />
      </Anchor>
    </Rect>
  );
}

Door.propTypes = {
  diameter: PropTypes.number.isRequired,
  stroke: PropTypes.number.isRequired,
  scale: PropTypes.number,
};

Door.defaultProps = {
  scale: 0.75,
};

export default Door;