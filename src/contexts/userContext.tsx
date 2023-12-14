import { Leiding } from "@/pages/home";
import React, { useMemo, useState } from "react";

interface UserIdContextProps {
    user: Leiding | null,
    setUser: (id: Leiding|null)=>void,
}

export const userContext = React.createContext<UserIdContextProps>({user: null, setUser: () => {}})

export const UserContextProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser]= useState<Leiding |null>(null)
    const value = useMemo(() => ({user, setUser}), [user])
    return <userContext.Provider value={value}>{children}</userContext.Provider>
}

