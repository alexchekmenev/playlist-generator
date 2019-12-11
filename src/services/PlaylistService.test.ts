import * as playlistService from './PlaylistService';
import * as songService from './SongService';
import {Song} from '../models/Song';
import {getAllSongs, getByLength, getRandomSong} from './PlaylistService';
import {Playlist} from '../models/Playlist';
import PlaylistNotFoundException from '../exceptions/PlaylistNotFoundException';
import InvalidLengthException from '../exceptions/InvalidLengthException';
import * as path from 'path';

describe('PlaylistService', () => {
    describe('init()', () => {
        const mockSongs = [
            new Song(1, 'ABBA', 'ab', 1),
            new Song(2, 'ABBA', 'bc', 1),
            new Song(3, 'ABBA', 'ca', 1)
        ];

        it('should be init successfully', () => {
            playlistService.init(mockSongs);
            const songs = getAllSongs();
            expect(songs).toHaveLength(mockSongs.length);
            expect(songs).toEqual(expect.arrayContaining(mockSongs));
        });
    });

    describe('getByLength()', () => {
        const mockEqualSongs = [
            new Song(1, 'ABBA', 'aa', 1),
            new Song(2, 'ABBA', 'aa', 1),
            new Song(3, 'ABBA', 'aa', 1),
            new Song(4, 'ABBA', 'aa', 1),
            new Song(5, 'ABBA', 'aa', 1)
        ];

        beforeEach(() => {
            songService.init(mockEqualSongs);
            playlistService.init(mockEqualSongs);
        });

        it('should throw PlaylistNotFoundException', () => {
            const firstSong = mockEqualSongs[1];
            const length = mockEqualSongs.length + 1;
            expect(() => {
                getByLength(firstSong, length);
            }).toThrowError(new PlaylistNotFoundException(length));
        });

        it('should not throw PlaylistNotFoundException', () => {
            const firstSong = mockEqualSongs[1];
            const length = mockEqualSongs.length;
            expect(() => {
                getByLength(firstSong, length);
            }).not.toThrowError(new PlaylistNotFoundException(length));
        });

        it('should be playlist with start at 3 and finish at 1', () => {
            const firstSong = mockEqualSongs[2];
            const lastSong = mockEqualSongs[0];
            const length = mockEqualSongs.length;
            const playlist: Playlist = getByLength(firstSong, length);
            expect(playlist.length).toEqual(length);
            expect(playlist.songs[0]).toEqual(firstSong);
            expect(playlist.songs[length - 1]).toEqual(lastSong);
        });

        it('should be playlist of length 3 with start at 3', () => {
            const firstSong = mockEqualSongs[2];
            const length = 3;
            const playlist: Playlist = getByLength(firstSong, length);
            expect(playlist.length).toEqual(length);
            expect(playlist.songs[0]).toEqual(firstSong);
        });

        it('should throw InvalidLengthException', () => {
            const firstSong = mockEqualSongs[1];
            const length = 0;
            expect(() => {
                getByLength(firstSong, length);
            }).toThrowError(new InvalidLengthException());
        });

        it('should throw InvalidLengthException', () => {
            const firstSong = mockEqualSongs[1];
            const length = -1;
            expect(() => {
                getByLength(firstSong, length);
            }).toThrowError(new InvalidLengthException());
        });

        it('should return playlist of length 1', () => {
            const mockEqualSongs = [
                new Song(1, 'ABBA', 'aa', 1),
                new Song(2, 'ABBA', 'bb', 1)
            ];
            songService.init(mockEqualSongs);
            playlistService.init(mockEqualSongs);
            const firstSong = mockEqualSongs[1];
            const length = 1;
            expect(() => {
                getByLength(firstSong, length);
            }).not.toThrow();
        });

        it('should return playlist of length 2000', async () => {
            const pathToXml: string = path.join(process.cwd(), 'test/data/RadioLibrary.xml');
            const songs: Song[] = await songService.loadFromXml(pathToXml);
            playlistService.init(songs);
            const firstSong = songs[0];
            const length = 2000;
            expect(() => {
                getByLength(firstSong, length);
            }).not.toThrow();
        });
    });

    describe('getRandomSong()', () => {
        it('should return null', () => {
            const mockSongs = [];
            songService.init(mockSongs);
            playlistService.init(mockSongs);
            expect(getRandomSong()).toBeNull();
        });

        it('should always return random song', () => {
            const mockSongs = [
                new Song(1, 'ABBA', 'ab', 1)
            ];
            const lastSong = mockSongs[0];
            songService.init(mockSongs);
            playlistService.init(mockSongs);
            expect(getRandomSong()).toEqual(lastSong);
        });

        it('should always return random song', () => {
            const mockSongs = [
                new Song(1, 'ABBA', 'ab', 1),
                new Song(2, 'ABBA', 'bc', 1),
                new Song(3, 'ABBA', 'ca', 1)
            ];
            const lastSong = mockSongs[0];
            songService.init(mockSongs);
            playlistService.init(mockSongs);
            expect(getRandomSong()).not.toEqual(lastSong);
        });
    });
});
