export class Song {
    public id: number;
    public artist: string;
    public name: string;
    public parsedName: string;
    public duration: number;

    constructor(id: number, artist: string, name: string, duration: number) {
        this.id = id;
        this.artist = artist;
        this.name = name;
        this.parsedName = parseSongName(name);
        this.duration = duration;
    }

    public toJSON() {
        return {
            id: this.id,
            artist: this.artist,
            original_name: this.name,
            name: this.parsedName,
            duration: this.duration
        };
    }
}

function parseSongName(name: string): string {
    const matches: string[] = name.match(/^([\(\[].*[\)\]][\s]*)*([^\(\)\[\]\s]+(\s*[^\(\)\[\]\s]+)*)/i);
    const parsed: string = matches && matches[2] ? matches[2] : name;
    let result: string = parsed;
    if (parsed) {
        let i = 0;
        let j = parsed.length;
        while (i < parsed.length && !isAlpha(parsed[i])) {
            i++;
        }
        while (j > 0 && !isAlpha(parsed[j - 1])) {
            j--;
        }
        if (i === parsed.length && j === 0) {
            result = null;
        } else {
            result = parsed.substring(i, j);
        }
    }
    return result ? result.toLowerCase() : result;
}

function isAlpha(c: string): boolean {
    const code = c.charCodeAt(0);
    return ((code > 64 && code < 91) || // upper alpha (A-Z)
        (code > 96 && code < 123));     // lower alpha (a-z)
}
