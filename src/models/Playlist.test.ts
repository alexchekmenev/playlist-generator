import {Song} from './Song';
import * as songService from '../services/SongService';
import {Playlist} from './Playlist';

describe('Playlist', () => {
    describe('prefix()', () => {
        const mockSongs = [
            new Song(1, 'ABBA', 'ab', 1),
            new Song(2, 'ABBA', 'bc', 1),
            new Song(3, 'ABBA', 'ca', 1)
        ];

        songService.init(mockSongs);
        const playlist: Playlist = new Playlist(mockSongs.map((s) => s.id));

        it('should return null', () => {
            const prefix = playlist.prefix(0);
            expect(prefix).toBeNull();
        });

        it('should return null', () => {
            const prefix = playlist.prefix(playlist.length + 1);
            expect(prefix).toBeNull();
        });

        it('should return prefix of length 2', () => {
            const prefix = playlist.prefix(2);
            expect(prefix.length).toEqual(2);
        });
    });
});
