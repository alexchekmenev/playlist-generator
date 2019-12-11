## Description
This repository is an implementation of the task of generating 
playlists. There is a set of ~ 5k songs from which you need to 
make playlists. The playlist consists of songs, where each song 
(except the first) begins with the same letter as the previous 
song ends. The application should process requests from users to 
create a playlist of length K (the first song is selected randomly).

The problem described above is reduced to the [problem of finding 
the longest path](https://en.wikipedia.org/wiki/Longest_path_problem) 
in a directed graph. Since the graph based on the provided list 
of songs contains cycles, the problem does not have a polynomial 
solution. Therefore, the problem was solved using k-SGL heuristics, 
given in [master's work](http://www.scholvin.com/thesis.pdf) (pages 29-33), 
as the most effective for the structure of the resulting directed 
graph.

After deploying this application, API endpoint will be available 
for the HTTP-request to create a playlist of K songs. 
An example of request and response is shown below:

```bash
curl -X GET 'http://localhost:5000/playlists?length=5'

{
    "songs": [
        {
            "id": 3574,
            "artist": "Depeche Mode",
            "original_name": "People Are People",
            "name": "people are people",
            "duration": 232176
        },
        {
            "id": 4769,
            "artist": "Johnny Cash & Waylon Jennings",
            "original_name": "Even Cowgirls Get the Blues",
            "name": "even cowgirls get the blues",
            "duration": 183040
        },
        {
            "id": 5106,
            "artist": "Loreena McKennitt",
            "original_name": "Standing Stones",
            "name": "standing stones",
            "duration": 419186
        },
        {
            "id": 5046,
            "artist": "Liz Story",
            "original_name": "Solid Colors",
            "name": "solid colors",
            "duration": 278709
        },
        {
            "id": 5018,
            "artist": "Attaboy",
            "original_name": "Solid Space Business",
            "name": "solid space business",
            "duration": 132937
        }
    ],
    "length": 5,
    "duration": 1246048
}
```

## Installation

```bash
npm install
```

## Development

```bash
npm run serve:dev // start in development mode
npm run test      // run unit tests
npm run lint      // check code quality
```

## Production

```bash
npm run start
```

