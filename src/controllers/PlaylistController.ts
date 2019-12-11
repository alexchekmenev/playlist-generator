import {Request, Response} from 'express';
import {getByLength, getRandomSong} from '../services/PlaylistService';
import {Playlist} from '../models/Playlist';
import {Song} from '../models/Song';

export const get = (req: Request, res: Response) => {
    const length = parseInt(req.query.length, 10);
    const song: Song = getRandomSong();
    const playlist: Playlist = getByLength(song, length);
    res.json(playlist);
};
