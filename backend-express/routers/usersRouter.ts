import express, { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { Error } from "mongoose";
import User from "../models/Users";
import { imagesUpload } from "../multer";
import bcrypt from "bcrypt";

const usersRouter = express.Router();
usersRouter.post('/', imagesUpload.single('image'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            image: req.file ? req.file.filename : null,
            token: randomUUID(),
        });

        await user.save();
        res.status(201).send(user);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error.message);
        } else {
            next(error);
        }
    }
});


usersRouter.post('/sessions', async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
              res.status(400).send({error: 'Username not found'});
            return
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
             res.status(400).send({error: 'Password is wrong'});
            return
        }
        user.token = randomUUID();
        await user.save()
        res.send(user);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error.message);
        } else {
            next(error);
        }
    }
});

usersRouter.delete('/sessions', async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
        const header = req.get('Authorization');
        if (!header || !header.startsWith('Bearer ')) {
             res.status(401).send({error: 'Token not provided!'});
            return
        }
        const token = header.split(' ')[1];
        const success = {message: 'Success'};
        if (!token)  {
            res.send(success)
            return
        }
        const user = await User.findOne({token});
        if (!user){
            res.send(success);
            return
        }

        user.token = "";
        user.save();

        res.send(success);
    } catch (e) {
        return next(e);
    }
});
export default usersRouter;
