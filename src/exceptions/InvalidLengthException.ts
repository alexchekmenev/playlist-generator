import HttpException from './HttpException';

class InvalidLengthException extends HttpException {
    constructor() {
        super(400, `Invalid playlist length`);
    }
}

export default InvalidLengthException;
