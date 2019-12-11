import {DirectedGraph, Path} from '../models/DirectedGraph';
import {Song} from '../models/Song';
import {isValidPath} from '../services/GraphService';
import PlaylistNotFoundException from '../exceptions/PlaylistNotFoundException';

export function buildPath(graph: DirectedGraph, song: Song, length: number): Path {
    const s = song.id;
    const t = graph.targetVertex();
    const path: Path = kSGL(1, graph, s, t, length);
    if (!isValidPath(s, length, path)) {
        throw new PlaylistNotFoundException(length);
    }
    return path;
}

function kSGL(k: number, graph: DirectedGraph, s: number, t: number, length: number): Path {
    const currentP: Path = [s];
    let bestP: Path = [s];
    const DFS = (graph: DirectedGraph, currentDepth: number, t: number, P: Path): void => {
        if (currentDepth < k && P[P.length - 1] !== t) {
            const nextVertexes: number[] = reverseBFS(graph, t, P); // array of potential path next vertex
            for (const v of nextVertexes) {
                const nextP: Path = P.slice();
                nextP.push(v);
                DFS(graph, currentDepth + 1, t, nextP);
            }
        } else {
            if (bestP.length < P.length) {
                bestP = P;
            } else if (bestP.length === P.length) {
                const lastVertexBest = bestP[bestP.length - 1];
                const lastVertex = P[P.length - 1];
                if (graph.outDegree[lastVertexBest] <= graph.outDegree[lastVertex]) {
                    bestP = P;
                }
            }
        }
    };
    const reverseBFS = (graph: DirectedGraph, t: number, P: Path): number[] => {
        const lastVertex: number = P[P.length - 1];
        const visited: {[key: number]: boolean} = {};
        for (const v of P) {
            visited[v] = true;
        }
        const target: {[key: number]: boolean} = {};
        let targetCount: number = 0;
        let visitedCount: number = 0;
        for (const v of graph.lists[lastVertex]) {
            if (!visited[v]) {
                target[v] = true;
                targetCount++;
            }
        }
        const queue: number[] = [t];
        visited[t] = true;
        while (queue.length && visitedCount < targetCount) {
            const v: number = queue.shift();
            for (const u of graph.reversedLists[v]) {
                if (!visited[u]) {
                    visited[u] = true;
                    if (target[u]) {
                        visitedCount++;
                    }
                    queue.push(u);
                }
            }
        }
        return Object.keys(target).filter((v) => visited[v]).map((x) => +x);
    };

    while (currentP.length < length && currentP[currentP.length - 1] !== t) {
        DFS(graph, 0, t, currentP);
        if (currentP.length < bestP.length) {
            const nextVertex = bestP[currentP.length];
            currentP.push(nextVertex);
        } else {
            break;
        }
    }
    return currentP;
}
