import React, { useState, useCallback } from 'react';

import { TAU } from 'zdog';

import makeStyles from '@material-ui/core/styles/makeStyles';
import useComputeRotate from 'Zdog/useComputeRotate';

import MuiBox from '@material-ui/core/Box';
import Illustration from 'Zdog/Illustration';
import Anchor from 'Zdog/Anchor';
// import Vault from 'components/Vault';
// import Logo from 'components/Logo';
import Gear from 'components/Gear';
import Key from 'components/Key';
import Lock from 'components/Lock';

// CONSTANTS
const CYCLES = 300;

const ILLU_ROTATE_ODD = {
  axis: 'z',
  easingAngle: TAU,
};
const ILLU_ROTATE_EVEN = {
  axis: 'y',
  easingAngle: TAU,
};

// HOOKS
const useStyles = makeStyles((theme) => ({
  boxRoot: {
    backgroundColor: theme.palette.grey[100],
  },
}));

// COMPONENTS
const App = () => {
  const classes = useStyles();

  const [rotating, setRotating] = useState(true);

  const { tickerRef, computeRotate } = useComputeRotate();

  const onDragStart = useCallback(
    () => {
      setRotating(false);
    },
    [setRotating],
  );

  const animate = useCallback(
    (illo) => {
      if (rotating) {
        const rotate = (tickerRef.current % CYCLES) < (CYCLES / 2)
          ? ILLU_ROTATE_ODD
          : ILLU_ROTATE_EVEN;
        const { axis } = rotate;
        const value = computeRotate(rotate);
        illo.rotate[axis] = value;
      }
    },
    [computeRotate, rotating, tickerRef],
  );

  return (
    <MuiBox
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      classes={{ root: classes.boxRoot }}
    >
      <Illustration animate={animate} dragRotate onDragStart={onDragStart}>
        {/* <Vault /> */}
        {/* <Logo translate={TRANSLATE_BACKGROUND} rotate={LOGO_ROTATE} /> */}
        <Anchor
          rotate={{ y: TAU / 4, z: -TAU / 4 }}
        >
          <Gear
            scale={3}
          />
          <Key
            translate={{ y: 300 }}
            rotate={{ x: TAU / 2 }}
          />
          <Lock
            translate={{ y: -300 }}
            rotate={{ x: TAU / 4, z: TAU / 4 }}
          />
        </Anchor>
      </Illustration>
    </MuiBox>
  );
};

export default App;
