import {Path} from '../models/DirectedGraph';

export function isValidPath(s: number, length: number, path: Path): boolean {
    const set: Set<number> = new Set();
    if (path.length !== length) { // wrong length
        return false;
    }
    if (path[0] !== s) { // first vertex is not equal to S
        return false;
    }
    for (const v of path) { // path is not vertex simple
        if (set.has(v)) {
            return false;
        }
        set.add(v);
    }
    return true;
}
