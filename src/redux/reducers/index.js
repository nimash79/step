import { combineSlices } from "@reduxjs/toolkit";

import userReducer from "./userReducer";

export default reducers = combineSlices({
  user: userReducer,
});
