import React from 'react';
import PropTypes from 'prop-types';

import Anchor from '../../Zdog/Anchor';
import Box from '../../Zdog/Box';
import Door from './Door';

// COMPONENTS
const Vault = ({diameter, stroke}) => {
  
  return (
      <Box 
        width={diameter}
        height={diameter}
        depth={diameter}
        color="#e32e73"
        frontFace={false}
      >
      <Anchor translate={{z: diameter / 2}}>
        <Door diameter={diameter} stroke={stroke / 2} />
      </Anchor>
      </Box>
  );
}

Vault.propTypes = {
  diameter: PropTypes.number,
  stroke: PropTypes.number,
};

Vault.defaultProps = {
  diameter: 150,
  stroke: 20,
}

export default Vault;