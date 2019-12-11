import {Song} from './Song';

export type Path = number[];
interface INumberNumberMap { [key: number]: number; }
interface INumberNumberArrayMap { [key: number]: number[]; }

export class DirectedGraph {
    public ids: number[];
    public lists: INumberNumberArrayMap;
    public reversedLists: INumberNumberArrayMap;
    public inDegree: INumberNumberMap;
    public outDegree: INumberNumberMap;

    constructor(songs: Song[]) {
        this.lists = {};
        this.reversedLists = {};
        this.inDegree = {};
        this.outDegree = {};
        for (const song of songs) {
            this.lists[song.id] = [];
            this.reversedLists[song.id] = [];
            this.inDegree[song.id] = 0;
            this.outDegree[song.id] = 0;
        }
        this.ids = songs.map((song) => song.id);
        for (const song of songs) {
            for (const nextSong of songs) {
                if (song.parsedName[song.parsedName.length - 1] !== nextSong.parsedName[0]) {
                    continue;
                }
                const from: number = song.id;
                const to: number = nextSong.id;
                if (from === to) {
                    continue;
                }
                this.lists[from].push(to);
                this.reversedLists[to].push(from);
                this.inDegree[to]++;
                this.outDegree[from]++;
            }
        }
    }

    public targetVertex(): number {
        let v: number = null;
        let minInDegree: number = Infinity;
        let minOutDegree: number = Infinity;
        for (const id of this.ids) {
            if (this.inDegree[id] === 0) {
                continue;
            }
            if (this.inDegree[id] < minInDegree || (this.inDegree[id] === minInDegree && this.outDegree[id] < minOutDegree)) {
                v = id;
                minInDegree = this.inDegree[id];
                minOutDegree = this.outDegree[id];
            }
        }
        return v;
    }
}
