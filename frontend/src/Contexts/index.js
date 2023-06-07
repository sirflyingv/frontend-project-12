import { createContext, useContext } from 'react';

export const AuthContext = createContext({});
export const ChatAPIContext = createContext({});

export const useChatAPI = () => useContext(ChatAPIContext);
export const useAuth = () => useContext(AuthContext);
