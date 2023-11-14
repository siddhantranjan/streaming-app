import { rateLimit } from "express-rate-limit";
import config from "../config/default";

export const setupRateLimit = (app: any) => {
    
    const routes: any = config.routeInfo;
    Object.keys(routes).forEach((api: string) => {
        if(routes[api].rateLimit){
            app.use(routes[api].url, rateLimit(routes[api].rateLimit))
        }
    })
}