import { runWithAdal } from 'react-adal';

import { authContext } from './adalConfig';

// set to false after configuring environment variables and adalConfig.ts
const DO_NOT_LOGIN = true;

runWithAdal(
  authContext,
  () => {
    require('./appIndex/appIndex.tsx');
  },
  DO_NOT_LOGIN
);
