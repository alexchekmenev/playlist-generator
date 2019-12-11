import {Song} from './Song';
import {getById} from '../services/SongService';

export class Playlist {
    public songs: Song[];
    public length: number;
    public duration: number;

    constructor(songIds: number[]) {
        this.songs = songIds.map(getById);
        this.length = this.songs.length;
        this.duration = this.songs.reduce((sum: number, song: Song): number => sum + song.duration, 0);
    }

    public prefix(length: number): Playlist {
        if (1 <= length && length <= this.length) {
            const songIds: number[] = this.songs.slice(0, length).map((s) => s.id);
            return new Playlist(songIds);
        }
        return null;
    }
}
