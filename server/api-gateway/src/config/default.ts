import { NextFunction, Request, Response } from "express";
import { fixRequestBody, responseInterceptor } from "http-proxy-middleware";

const config = {
    server: {
        secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc',
        port: 3001,
        nodeEnv: 'development'
    },
    routeInfo: {
        auth: {
            url: '/auth',
            rateLimit: {
                windowMs: 15 * 60 * 1000,
                max: 500,
                message: "Login/Signup try exceeded, try again after some time.",
                handler: (_req: Request, _res: Response, next: NextFunction, options: any) => next({
                    message: options.message,
                    status: options.statusCode
                })
            },
            proxy: {
                target: "http://127.0.0.1:3002/",
                changeOrigin: false,
                pathRewrite: {
                    [`^/auth`]: '',
                },
                onProxyReq: fixRequestBody,
            }
        },
        users: {
            url: '/users',
            rateLimit: {
                windowMs: 15 * 60 * 1000,
                max: 1000,
                message: 'Fetch limit exceeded, Please try again later',
                handler: (_req: Request, _res: Response, next: NextFunction, options: any) => next({
                    message: options.message,
                    status: options.statusCode
                })
            },
            proxy: {
                target: "http://127.0.0.1:3003/",
                changeOrigin: true,
                pathRewrite: {
                    [`^/users`]: '',
                },
                onProxyReq: fixRequestBody,
            }
        },
        stream: {
            url: '/stream',
            rateLimit: {
                windowMs: 15 * 60 * 1000,
                max: 5000,
                message: "Stream Service having some problem, try again after some time.",
                handler: (_req: Request, _res: Response, next: NextFunction, options: any) => next({
                    message: options.message,
                    status: options.statusCode
                })
            },
            proxy: {
                target: "http://127.0.0.1:3004/",
                changeOrigin: false,
                pathRewrite: {
                    [`^/stream`]: '',
                },
                onProxyReq: fixRequestBody,
            }
        }
    }
};

export default config;