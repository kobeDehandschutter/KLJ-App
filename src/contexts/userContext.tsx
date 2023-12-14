import React, { useMemo, useState } from "react";

interface UserIdContextProps {
    userId: string | null,
    setUserId: (id: string|null)=>void,
}

export const userContext = React.createContext<UserIdContextProps>({userId: null, setUserId: () => {}})

export const UserContextProvider = ({children}: {children: React.ReactNode}) => {
    const [userId, setUserId]= useState<string |null>(null)
    const value = useMemo(() => ({userId, setUserId}), [userId])
    return <userContext.Provider value={value}>{children}</userContext.Provider>
}

