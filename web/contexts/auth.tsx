import React from "react";

interface AuthCtxType {
  login: () => string;
  logout: () => string;
  signUp: () => string;
}

export const AuthCtx = React.createContext({} as AuthCtxType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const login = () => {
    return "LOGGED_IN";
  };

  const logout = () => {
    return "LOGGED_OUT";
  };

  const signUp = () => {
    return "SIGNED_UP";
  };

  return (
    <AuthCtx.Provider value={{ login, logout, signUp }}>
      {children}
    </AuthCtx.Provider>
  );
};
