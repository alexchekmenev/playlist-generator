import * as songService from './SongService';
import {getAll} from './SongService';
import * as path from 'path';

describe('SongService', () => {
    describe('loadFromXml()', () => {
        it('should contain 4837 songs', async () => {
            const pathToXml: string = path.join(process.cwd(), 'test/data/RadioLibrary.xml');
            await songService.loadFromXml(pathToXml);
            const songs = getAll();
            expect(songs).toHaveLength(4837);
        });

        it('should contain 0 songs', async () => {
            const pathToXml: string = path.join(process.cwd(), 'test/data/NoSongs.xml');
            await songService.loadFromXml(pathToXml);
            const songs = getAll();
            expect(songs).toHaveLength(0);
        });

        it('should contain 0 songs', async () => {
            const pathToXml: string = path.join(process.cwd(), 'test/data/NoValidSongs.xml');
            await songService.loadFromXml(pathToXml);
            const songs = getAll();
            expect(songs).toHaveLength(0);
        });
    });
});
