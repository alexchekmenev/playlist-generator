import {isValidPath} from './GraphService';

describe('GraphService', () => {
    describe('init()', () => {

        it('should be valid path', () => {
            expect(isValidPath(1, 2, [1, 2])).toBeTruthy();
            expect(isValidPath(1, 3, [1, 2, 3])).toBeTruthy();
        });

        it('should be invalid path', () => {
            expect(isValidPath(2, 3, [1, 2, 3])).not.toBeTruthy();
            expect(isValidPath(1, 2, [1, 2, 3])).not.toBeTruthy();
            expect(isValidPath(1, 4, [1, 2, 3])).not.toBeTruthy();
            expect(isValidPath(1, 3, [1, 1, 3])).not.toBeTruthy();
        });
    });
});
