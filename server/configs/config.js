module.exports = {
    PORT: process.env.PORT || 5000,
    ACCESS_KEY: process.env.ACCESS_KEY,
    REFRESH_KEY: process.env.REFRESH_KEY,
    ADMIN: 'ADMIN',
    USER: 'USER',
    REGEX: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}