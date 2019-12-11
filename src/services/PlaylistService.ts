import {DirectedGraph, Path} from '../models/DirectedGraph';
import {Song} from '../models/Song';
import {Playlist} from '../models/Playlist';
import {buildPath} from '../util/kSGL';
import InvalidLengthException from '../exceptions/InvalidLengthException';

let songs: Song[] = [];
let graph: DirectedGraph = new DirectedGraph([]);
let cache: Map<number, Playlist> = new Map();

export function init(otherSongs: Song[]): void {
    songs = otherSongs;
    graph = new DirectedGraph(otherSongs);
    cache = new Map();
}

export function getByLength(song: Song, length: number): Playlist {
    if (isNaN(length) || length < 1) {
        throw new InvalidLengthException();
    }
    let playlist: Playlist = getCachedPlaylist(song, length);
    if (!playlist) {
        const path: Path = buildPath(graph, song, length);
        playlist = new Playlist(path);
        cachePlaylist(playlist);
    }
    return playlist;
}

export function getAllSongs(): Song[] {
    return songs;
}

export function getRandomSong(): Song {
    if (songs.length === 0) {
        return null;
    }
    if (songs.length === 1) {
        return songs[0];
    }
    let index: number = (Math.random() * songs.length) | 0;
    while (songs[index].id === graph.targetVertex()) {
        index = (Math.random() * songs.length) | 0;
    }
    return songs[index];
}

function getCachedPlaylist(song: Song, length: number): Playlist {
    if (cache.has(song.id) && cache.get(song.id).length >= length) {
        return cache.get(song.id).prefix(length);
    }
    return null;
}

function cachePlaylist(playlist: Playlist): void {
    const firstSongId = playlist.songs[0].id;
    if (!cache.has(firstSongId) || cache.has(firstSongId) && cache.get(firstSongId).length < playlist.length) {
        cache.set(firstSongId, playlist);
    }
}
