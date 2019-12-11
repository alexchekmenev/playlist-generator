import {Song} from './Song';

describe('Song', () => {
    describe('toJSON()', () => {
        const mockSongs = [
            new Song(1, 'ABBA', 'Love', 1),
            new Song(2, 'ABBA', 'Sweet Dreams (Live Remix)', 1),
            new Song(3, 'ABBA', '[maybe] blue water', 1),
            new Song(4, 'ABBA', 'Galaxy 25', 1),
            new Song(4, 'ABBA', ':)', 1)
        ];

        it('should be valid JSON object', () => {
            const json = mockSongs[0].toJSON();
            expect(json.id).toEqual(1);
            expect(json.artist).toEqual('ABBA');
            expect(json.original_name).toEqual('Love');
            expect(json.name).toEqual('love');
            expect(json.duration).toEqual(1);
        });

        it('should be parsed right', () => {
            expect(mockSongs[0].toJSON().name).toEqual('love');
            expect(mockSongs[1].toJSON().name).toEqual('sweet dreams');
            expect(mockSongs[2].toJSON().name).toEqual('blue water');
            expect(mockSongs[3].toJSON().name).toEqual('galaxy');
            expect(mockSongs[4].toJSON().name).toBeNull();
        });
    });
});
