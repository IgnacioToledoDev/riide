import Cookies from "universal-cookie";

const setCookie = (value: string) => {
    const loginCookie = new Cookies();
    loginCookie.set('token', value, { path: "/" });

    return true;
}



export {
    setCookie
};