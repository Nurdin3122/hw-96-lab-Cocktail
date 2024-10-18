import express, { Request, Response, NextFunction } from "express";
import Cocktail from "../models/Cocktails";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";

const cocktailsRouter = express.Router();

cocktailsRouter.get('/',async (req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
        const cocktails = await Cocktail.find();
        res.status(201).send(cocktails);
    } catch (error) {
        return next(error);
    }
});


cocktailsRouter.get('/:id', auth,async (req:Request,res:Response,next:NextFunction):Promise<void>=> {
    try {
        const { id } = req.params;
        const cocktail = await Cocktail.findById(id);
        if (!cocktail) {
             res.status(404).send({ error: 'Cocktail not found' });
            return
        }
         res.send(cocktail);
        return
    } catch (error) {
         return next(error)
    }

})

cocktailsRouter.post('/',auth,imagesUpload.single('image'),async (req:RequestWithUser,res:Response,next:NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
             res.status(401).send({ error: 'User not authenticated' });
             return
        }

        let ingredients;
        try {
            ingredients = JSON.parse(req.body.ingredient);
        } catch (err) {
             res.status(400).send({ error: 'Invalid ingredient format' });
            return
        }

        const cocktail = new Cocktail({
            user: user._id,
            name:req.body.name,
            image:req.file ? req.file.filename : null,
            recipe:req.body.recipe,
            ingredient:ingredients
        });
        await cocktail.save();
        console.log(cocktail)
        res.status(201).send(cocktail);
    } catch (error) {
        return next(error);
    }
});

export default cocktailsRouter;