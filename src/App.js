import React, {useState, useCallback, useMemo} from 'react';

import {TAU} from 'zdog';

import makeStyles from '@material-ui/core/styles/makeStyles';

import MuiBox from '@material-ui/core/Box';
import Illustration from './Zdog/Illustration';
import Vault from './components/Vault';
import Logo from './components/Logo';
import Gear from './components/Gear';

// CONSTANTS
const TRANSLATE_BACKGROUND = { z: -300 };
const LOGO_ROTATE = { x: TAU / 2 };

const ILLU_ROTATE = {
  axis: 'x',
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

  const onDragStart = useCallback(
    () => {
      setRotating(false);
    },
    [setRotating],
  );

  const rotate = useMemo(
    () => rotating ? ILLU_ROTATE : null,
    [rotating],
  );

  return (
    <MuiBox 
      height="100%" 
      width="100%" 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      classes={{root: classes.boxRoot}}
    >
      <Illustration rotate={null} dragRotate onDragStart={onDragStart}>
        {/* <Vault/> */}
        {/* <Logo translate={TRANSLATE_BACKGROUND} rotate={LOGO_ROTATE} /> */}
        <Gear />
      </Illustration>
    </MuiBox>
  );
}

export default App;
