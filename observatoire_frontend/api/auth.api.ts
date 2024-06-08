import { jwtDecode } from "jwt-decode";

export class AuthApi {
    private static readonly baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    static async login(email: string, password: string): Promise<{ok: boolean, data: {token?: string, user?: any, message?: string}}> {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        };
        const response = await fetch(`${this.baseUrl}/auth/login`, options);
        if(response.ok) {
            const { token } = await response.json();
            const user = await jwtDecode(token);
            return {ok: true, data: {token, user}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }
}