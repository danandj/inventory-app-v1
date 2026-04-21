import { BASE_URL } from '../constants/api';
import { LoginErrorResponse, LoginSuccessResponse, RegisterErrorResponse, RegisterSuccessResponse } from '../types/auth';

export const login = async (
    username: string,
    password: string
): Promise<LoginSuccessResponse> => {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw data as LoginErrorResponse;
    }
    return data as LoginSuccessResponse;
};

export const register = async (
    username: string,
    email: string,
    nama: string,
    password: string
): Promise<RegisterSuccessResponse> => {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, nama, password }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw data as RegisterErrorResponse;
    }
    return data as RegisterSuccessResponse;
};