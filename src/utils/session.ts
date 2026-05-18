import * as SecureStore from 'expo-secure-store';
import { User } from '../types/auth';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const saveSession = async (
    token: string,
    user: User
) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);

    await SecureStore.setItemAsync(
        USER_KEY,
        JSON.stringify(user)
    );
};

export const getToken = async () => {
    return await SecureStore.getItemAsync(TOKEN_KEY);
};

export const getUser = async (): Promise<User | null> => {
    const user = await SecureStore.getItemAsync(USER_KEY);

    if (!user) return null;

    return JSON.parse(user);
};

export const clearSession = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
};