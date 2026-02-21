'use client';

import { createContext, useContext } from "react";

const SessionContext = createContext(undefined);

export function SessionProvider({ sessionUser, children }) {
  return (
    <SessionContext.Provider value={sessionUser}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  const session = useContext(SessionContext);
  if (session === undefined) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  return session;
}