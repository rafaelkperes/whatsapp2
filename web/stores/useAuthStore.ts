import create from "zustand";
import { UserType } from "../interface/UserType";

export type AuthStore = {
  user: false | UserType;
  auth: "LOGGED_IN" | "LOGGED_OUT" | "LOADING";
};

const useAuthStore = create<AuthStore>((set) => ({
  user: false,
  auth: "LOGGED_OUT",
  setAuth: () => {
    set((state) => ({
      ...state,
      user: state.user,
      auth: state.auth,
    }));
  },
}));

export default useAuthStore;
