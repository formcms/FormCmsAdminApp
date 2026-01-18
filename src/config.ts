export const configs = {
    apiURL: import.meta.env.VITE_REACT_APP_API_URL ?? '/api',
    routerPrefix: import.meta.env.VITE_REACT_APP_ROUTER_PREFIX ?? '/admin',
    schemaBuilderRouter: '/mate',
}

export const entityRouterPrefix = configs.routerPrefix + "/entities";
export const authRouterPrefix = configs.routerPrefix + '/auth';
export const auditRouterPrefix = configs.routerPrefix + "/audit";
export const profileRouterPrefix = configs.routerPrefix + "/profile";

console.log({ configs })