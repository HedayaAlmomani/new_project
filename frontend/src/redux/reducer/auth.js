import { createSlice } from "@reduxjs/toolkit";

const getAuthDataFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  return { token, userId };
};

const initialState = {
  token: getAuthDataFromLocalStorage().token || "",
  userId: getAuthDataFromLocalStorage().userId || null,
  isLoggedIn: !!getAuthDataFromLocalStorage().token,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {        
      const { token, userId } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      state.token = token;
      state.userId = userId;
      state.isLoggedIn = true;
    },

    logoutAction: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      state.token = "";
      state.userId = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginAction, logoutAction } = auth.actions;
export default auth.reducer;
