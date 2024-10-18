import {RequestWithUser} from "./auth";
import {NextFunction, Response , Request} from "express";

const permit = (...roles: string[]) => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {

        if (!req.user) {
             res.status(401).send({error: 'Unauthenticated'});
            return
        }
        if (!roles.includes(req.user.role)) {
             res.status(403).send({error: 'Unauthorized'});
            return
        }
        next();
        return;
    }
};
export default permit;