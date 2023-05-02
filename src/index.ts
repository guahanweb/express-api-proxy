import { Router, Request, Response, NextFunction } from 'express';
import { createServer } from './server';
import { createRouter } from './server/router';
import { app as appConfig } from './config';

main();

async function main() {
    const server = createServer();

    // we will use this callback model to apply all the overrides
    // first, and then the router will finally use the proxy middleware
    const router = createRouter(appConfig, (router: Router) => {
        // add any extra routes or middleware here
        router.use('/testing', (req: Request, res: Response, next: NextFunction) => {
            req.headers['x-proxy-testing'] = 'foobar';
            next();
        });
    });

    // set up basic proxy routing
    server.use('/', router);

    await server.listen(appConfig.port);
}
