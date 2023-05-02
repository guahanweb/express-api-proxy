import { default as express, Express, Request, Response } from 'express';

export function createServer(): Express {
    const server = express();

    return server;
}
