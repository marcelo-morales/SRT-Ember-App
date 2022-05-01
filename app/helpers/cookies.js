
export const checkCookieExist = (name) => {
    if (document.cookie.split(';').some((item) => item.trim().startsWith(`${name}=`))) {
        return true;
    }
}

export const writeCookie = (name, value) => {
    document.cookie = `${name}=${value}`;
}

export const readCookie = (name) => {
    return document.cookie.split(';').find(row => row.startsWith(`${name}=`)).split("=")[1];
}

export const deleteCookie = (name) => {
    return document.cookie = `${name}=;expires=${new Date(0).toUTCString()}`;
}
