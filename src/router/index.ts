import express from 'express';
import authentication from './authentication';
import users from './users';
import places from './places';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    places(router);
    return router;
}