export interface User {
    id: number;
    username: string;
    email: string;
    nama: string;
}

export interface LoginSuccessResponse {
    message: string;
    data: {
        token: string;
        user: User;
    };
}

export interface LoginErrorResponse {
    message: string;
    data: null;
}

export interface RegisterSuccessResponse {
    message: string;
    data: User & {
        token: string;
        createdAt: string;
    };
}

export interface RegisterErrorResponse {
    message: string;
    data: null;
}