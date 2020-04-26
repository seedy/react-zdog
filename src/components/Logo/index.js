import React, { useMemo } from 'react';
import PropTypes from 'prop-types';


import Anchor from '../../Zdog/Anchor';
import Rect from '../../Zdog/Rect';
import Shape from '../../Zdog/Shape';

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

  const rectDiameter = useMemo(
    () => 2 * (radius + stroke) ,
    [radius, stroke],
  );

  const rectTranslate = useMemo(
    () => ({z: -stroke}),
    [stroke],
  );


  return (
    <Anchor {...rest}>
      <Shape
        path={path}
        stroke={stroke}
        closed={false}
        color="white"
      />
      <Rect
        width={rectDiameter}
        height={rectDiameter}
        stroke={stroke}
        fill
        color="#e32e73"
        translate={rectTranslate}
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