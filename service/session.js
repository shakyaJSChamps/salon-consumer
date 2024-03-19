export default class Session {
    static get(key) {
        if (typeof window !== 'undefined') {

            return localStorage.getItem(key);
        }
        return null;
    }

    static getObject(key) {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem(key);

            if (data !== null && data !== undefined) {
                try {
                    return JSON.parse(data);
                } catch (error) {
                    console.error("Error parsing JSON data:", error);
                    return null;
                }
            }
        }
        return null;
    }


    static set(key, value) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, value);
        }
    }

    static setObject(key, value) {
        if (typeof window !== 'undefined') {
            const data = JSON.stringify(value);
            localStorage.setItem(key, data);
        }
    }

    static remove(key) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    }
}