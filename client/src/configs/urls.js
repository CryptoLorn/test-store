const baseURL = 'http://localhost:5000/' //api

export const urls = {
    registration: 'api/auth/registration', //remove all api
    login: 'api/auth/login',
    refresh: 'api/auth/refresh',
    logout: 'api/auth/logout',
    forgotPassword: 'api/user/password/forgot',
    users: 'api/user',
    baskets: 'api/basket',
    sneakers: 'api/sneakers',
    brands: 'api/brands',
    types: 'api/types',
    orders: 'api/orders',
    search: 'api/search',
    analytics: 'api/analytics'
}

export default baseURL;