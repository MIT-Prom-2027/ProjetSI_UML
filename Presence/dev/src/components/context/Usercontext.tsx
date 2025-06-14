"use client";
import { createContext } from "react";

interface userInterface {
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

export const UserContext = createContext({
  user: {} as userInterface,
  setUser: (user: userInterface) => {
    console.log(user);
  },
});
