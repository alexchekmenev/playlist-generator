import express, {Application, NextFunction, Request, Response} from 'express';
import HttpException from './exceptions/HttpException';
import * as playlist from './controllers/PlaylistController';

const app: Application = express();

app.get('/playlists', playlist.get);

function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
    const status = error instanceof HttpException ? error.status || 500 : 500;
    const message = error.message || 'Something went wrong';
    response
        .status(status)
        .json({
            error: message
        });
}
app.use(errorMiddleware);

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', (err) => {
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    });

export default app;
