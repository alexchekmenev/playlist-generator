import * as path from 'path';
import {loadFromXml} from '../services/SongService';
import {Song} from '../models/Song';
import {init} from '../services/PlaylistService';

/**
 * Load songs from XML file & init PlaylistService
 */
export async function load(): Promise<void> {
    const pathToXml: string = path.join(process.cwd(), 'data/RadioLibrary.xml');
    const songs: Song[] = await loadFromXml(pathToXml);
    init(songs);
}
