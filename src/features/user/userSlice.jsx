import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  username: null,
  email: "",
  role: "",
  status: "",
  firstname:"",
  lastname:"",
  gender:"",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action) {
      const { name, email, role, status ,username,firstname,lastname,gender} = action.payload;
      if (name) state.name = name;
           if (username) state.username = username;
      if (email) state.email = email;
      if (role) state.role = role;
      if (status) state.status = status;
      if(firstname)state.firstname=firstname;
      if(lastname)state.lastname=lastname;
      if(gender) state.gender=gender;
    },
    logout(state) {
      state.user = null;
      state.email = "";
      state.role = "";
      state.status = "";
      state.username=null;
      state.firstname=null;
      state.lastname=null;
      state.gender=null;
    },
  },
});

export const { setUserDetails, logout } = userSlice.actions;
export default userSlice.reducer;
