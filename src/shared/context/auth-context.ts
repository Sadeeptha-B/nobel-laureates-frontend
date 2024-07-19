import { createContext } from "react";

type context = {
  isLoggedIn: boolean;
  userId: string | null | undefined;
  token: string | null | undefined;
  login: (uid: string, email: string, token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: (uid: string, email: string, token: string) => {},
  logout: () => {},
} as context);
