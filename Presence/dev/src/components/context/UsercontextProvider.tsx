"use client";

import { ReactNode, useState } from "react";
import { UserContext } from "./Usercontext";

interface userProps {
  children: ReactNode;
}
interface userInterface {
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

export default function UserContextProvider({ children }: userProps) {
  const [user, setuser] = useState<userInterface>();

  return (
    <UserContext.Provider
      value={{ user: user as userInterface, setUser: setuser }}
    >
      {children}
    </UserContext.Provider>
  );
}
