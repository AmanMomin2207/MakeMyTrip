import { configureStore, createSlice } from "@reduxjs/toolkit";
import { SaveAll } from "lucide-react";

const getuserfromlocalstorage = () => {
  const storeduser = localStorage.getItem("user");
  return storeduser ? JSON.parse(storeduser) : null;
};

const saveusertolocalstoreage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const initialState = {
  user: getuserfromlocalstorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log(action.payload);
      saveusertolocalstoreage(action.payload);
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
