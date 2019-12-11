import fs from 'fs';
import xml2js from 'xml2js';
import {Song} from '../models/Song';
import {promisify} from 'util';

const parser = new xml2js.Parser();
const readFile = promisify(fs.readFile);
const parseString = promisify(parser.parseString);

interface INumberSongMap { [key: number]: Song; }

let songs: Song[] = [];
let songById: INumberSongMap = {};

export function init(otherSongs: Song[]): void {
    songs = otherSongs;
    songById = {};
    for (const song of songs) {
        songById[song.id] = song;
    }
}

export async function loadFromXml(p: string): Promise<Song[]> {
    const data: Buffer = await readFile(p);
    const result = await parseString(data);
    songs = parseSongs(result);
    songById = {};
    for (const song of songs) {
        songById[song.id] = song;
    }
    return songs;
}

export function getAll() {
    return songs;
}

export function getById(songId): Song {
    return songById.hasOwnProperty(songId) ? songById[songId] : null;
}

function parseSongs(json): Song[] {
    const artists = json.Library.Artist;
    const songs: Song[] = [];
    const set: Set<string> = new Set();
    for (const a of artists) {
        const artistObject = a.$;
        const artistSongs = a.Song;
        if (artistSongs) {
            for (const s of artistSongs) {
                const songObject = s.$;
                const song: Song = new Song(+songObject.id, artistObject.name, songObject.name, +songObject.duration);
                const key: string = `${song.artist}_${song.parsedName}`;
                if (song.parsedName && !set.has(key)) {
                    set.add(key);
                    songs.push(song);
                }
            }
        }
    }
    return songs;
}
