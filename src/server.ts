import app from './app';
import {load} from './loaders/SongLoader';

const port = app.get('port') || 5000;

load().then(() => {
    /**
     * Start Express server.
     */
    app.listen(port, () => {
        console.log('App is running at http://localhost:%d in %s mode', port, app.get('env'));
        console.log('Press CTRL-C to stop\n');
    });
}).catch((e) => {
    console.error(e);
});
