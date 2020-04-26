import React from 'react';

import {TAU} from 'zdog';

import makeStyles from '@material-ui/core/styles/makeStyles';

import MuiBox from '@material-ui/core/Box';
import Illustration from './Zdog/Illustration';
import Vault from './components/Vault';
import Logo from './components/Logo';

// CONSTANTS
const TRANSLATE_BACKGROUND = { z: -100 };
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

  return (
    <MuiBox 
      height="100%" 
      width="100%" 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      classes={{root: classes.boxRoot}}
    >
      <Illustration rotate={ILLU_ROTATE}>
        <Vault/>
        <Logo translate={TRANSLATE_BACKGROUND} rotate={LOGO_ROTATE} />
      </Illustration>
    </MuiBox>
  );
}

export default App;
