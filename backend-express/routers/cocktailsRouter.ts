import express, { Request, Response, NextFunction } from "express";
import Cocktail from "../models/Cocktails";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import permit from "../middleware/permit";

const cocktailsRouter = express.Router();

cocktailsRouter.get('/',async (req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
        const cocktails = await Cocktail.find();
        res.status(201).send(cocktails);
    } catch (error) {
        return next(error);
    }
});

cocktailsRouter.get('/published', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const publishedCocktails = await Cocktail.find({ isPublished: true });
        res.status(200).send(publishedCocktails);
    } catch (error) {
        return next(error);
    }
});



cocktailsRouter.get('/:id',async (req:RequestWithUser,res:Response,next:NextFunction):Promise<void>=> {
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

});

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
        res.status(201).send(cocktail);
    } catch (error) {
        return next(error);
    }
});

cocktailsRouter.delete("/:id", auth, permit('admin'), async (req:RequestWithUser,res:Response,next:NextFunction):Promise<void> => {
    try {
        const cocktailID = req.params.id;
        await Cocktail.deleteOne({ _id: cocktailID });
         res.status(200).send({ message: 'Cocktail deleted successfully' });
        return
    } catch (error) {
         res.status(500).send({ error: 'Failed to delete cocktail' });
        return
    }
});


cocktailsRouter.patch("/:id/togglePublished", auth, permit("admin"), async (req:RequestWithUser,res:Response,next:NextFunction):Promise<void> => {
    try {
        const id = req.params.id;
        const cocktail = await Cocktail.findById(id);

        if (!cocktail) {
             res.status(404).send({ message: 'Cocktail not found' });
            return
        }

        cocktail.isPublished = !cocktail.isPublished;
        await cocktail.save();

         res.status(200).send(cocktail);
        return
    } catch (error) {
         res.status(500).send({ message: 'Something went wrong' });
        return
    }
});





export default cocktailsRouter;