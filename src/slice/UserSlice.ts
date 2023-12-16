// userSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDetails {
    firstName:string,
    lastName:string,
    schoolName:string,
    grade?:number,
    mobileNo?:number,
    userId?:string
}

interface UserState {
  userDetails: UserDetails | null;
}

const initialState: UserState = {
  userDetails: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
    },
  },
});

export const { storeUserDetails } = userSlice.actions;
export const selectUserDetails = (state: { user: UserState }) =>
  state.user.userDetails;

export default userSlice.reducer;
