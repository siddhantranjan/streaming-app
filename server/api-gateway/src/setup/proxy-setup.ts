import config from "../config/default";
import { createProxyMiddleware } from "http-proxy-middleware";

export const setupProxies = (app: any) => {

    const routes: any = config.routeInfo;
    Object.keys(routes).forEach((api: string) => {
        app.use(routes[api].url, createProxyMiddleware(routes[api].proxy))
    })
}
