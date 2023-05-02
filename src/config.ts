export const app = {
    host: loadFromEnv('HOST', 'localhost'),
    port: loadFromEnv('PORT', 3000),
    targetUrl: loadFromEnv('API_TARGET', 'https://api.google.com'),
};

function loadFromEnv(key: string, defaultValue: any = undefined) {
    const value = process.env && process.env[key];
    return value || defaultValue;
}