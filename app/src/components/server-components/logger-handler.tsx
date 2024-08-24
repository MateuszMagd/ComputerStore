import Cookies from "js-cookie";

export function parseJwt(token: string)  {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
};

export default function isLogged(): boolean {
    const token = Cookies.get('token');
    return !!token;
}

export function getType(): string | undefined{
    return Cookies.get('type');
}

export const saveToken = (token: string) => {
    Cookies.set('token', token, { expires: 7 }); // Token expiares in 7 days
};
  
export const getToken = (): string | undefined => {
    return Cookies.get('token');
};

export const clearToken = () => {
    Cookies.remove('token');
}