import { Router, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export function createRouter(opts: any, configure: Function) {
    // start by using the proviced configure method
    // to register any overrides to the router
    const router = Router();

    configure(router);

    const proxyMiddleware = createProxyMiddleware({
        target: opts.targetUrl,
        changeOrigin: true,
        onProxyReq: (proxyReq: any, req: Request, res: Response) => {
            // force no cache if we get this far
            proxyReq.setHeader('cache-control', 'no-cache, no-store, must-revalidate');
            proxyReq.setHeader('pragma', 'no-cache');
            proxyReq.setHeader('expires', '0');
        },
        // todo: on response, allow for overrides
        onProxyRes: (proxyRes: any, req: Request, res: Response) => {
            return proxyRes;
        },
    });

    router.all('*', proxyMiddleware);
    return router;
}
