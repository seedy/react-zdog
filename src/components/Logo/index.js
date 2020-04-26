import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import {TAU} from 'zdog';

import Anchor from '../../Zdog/Anchor';
import Hemisphere from '../../Zdog/Hemisphere';
import Shape from '../../Zdog/Shape';

// CONSTANTS
const ROTATE_HEMISPHERE = {x: TAU / 2};

// COMPONENTS
const Logo = ({radius, stroke, ...rest}) => {

  const path = useMemo(
    () => [
      { x: radius, y: radius },
      { x: radius, y: -radius },
      { x: 0 },
      { x: -radius, y: -radius },
      { x: -radius, y: radius },
    ],
    [radius],
  );

  const hemisphereDiameter = useMemo(
    () => 2.5 * (radius + stroke) ,
    [radius, stroke],
  );

  const hemisphereTranslate = useMemo(
    () => ({z: -stroke}),
    [stroke],
  );


  return (
    <Anchor {...rest}>
      <Shape
        path={path}
        stroke={stroke}
        closed={false}
        color="#e32e73"
      />
      <Hemisphere
        diameter={hemisphereDiameter}
        backface="white"
        color="#e32e73"
        translate={hemisphereTranslate}
        rotate={ROTATE_HEMISPHERE}
      />
    </Anchor>
  );
}

Logo.propTypes = {
  radius: PropTypes.number,
  stroke: PropTypes.number,
};

Logo.defaultProps = {
  radius: 40,
  stroke: 20,
};

export default Logo;