import { NextFunction, Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { UserFields } from "../types.db";
import User from "../models/Users";
export interface RequestWithUser extends Request {
    user?: HydratedDocument<UserFields>;
}
const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const header = req.get('Authorization');
    if (!header || !header.startsWith('Bearer ')) {
         res.status(401).send({error: 'Token not provided!'});
        return
    }
    const token = header.split(' ')[1];
    const user = await User.findOne({token});
    if (!user) {
         res.status(401).send({error: 'No such user!'});
        return
    }
    req.user = user;
    next();
    return

};



export default auth;