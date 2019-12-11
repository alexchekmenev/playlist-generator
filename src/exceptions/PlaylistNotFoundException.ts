import HttpException from './HttpException';

class PlaylistNotFoundException extends HttpException {
    constructor(length: number) {
        super(404, `There are no playlists of length ${length}`);
    }
}

export default PlaylistNotFoundException;
