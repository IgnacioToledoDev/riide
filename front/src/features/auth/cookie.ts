import Cookies from "universal-cookie";

class CookieManager {
    private client: Cookies;
    public static allowedKeys = [
        'token',
    ]

    constructor() {
        this.client = new Cookies();
    }

    setCookie(name: string, value: string, options: object = { path: '/' }): boolean {
        if (!CookieManager.allowedKeys.includes(name)) {
            throw new Error(`The key ${name} is not allowed`);
        }

        this.client.set(name, value, options);

        return true;
    }

    getCookie(name: string) {
        if (!CookieManager.allowedKeys.includes(name)) {
            throw new Error(`The key ${name} is not allowed`);
        }

        return this.client.get(name);
    }

    removeCookie(name: string, options: any = { path: "/" }) {
        if (!CookieManager.allowedKeys.includes(name)) {
            throw new Error(`The key ${name} is not allowed`);
        }

        this.client.remove(name, options);
    }
}

export default CookieManager;