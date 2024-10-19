import mongoose, {Schema, Types} from "mongoose";
import User from "./Users";

const CocktailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const userExists = await User.findById(value);
                return Boolean(userExists);
            },
            message: 'user does not exist!',
        },
    },
    name: {
        type:String,
        required:true,
        unique:true,
    },
    image: {
        type: String,
    },
    recipe:{
        type:String,
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    ingredient:{
        type: [{
            name: { type: String, required: true },
            quantity: { type: String, required: true },
        }],
        required: true,
    },
    ratings: {
        type: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
                validate: {
                    validator: async (value: Types.ObjectId) => {
                        const userExists = await User.findById(value);
                        return Boolean(userExists);
                    },
                    message: 'user does not exist!',
                },
            },
            score: {
                type: Number,
                min: 1,
                max: 5,
                required: true,
            },
        }],
        default: [],
    },
})

const Cocktail = mongoose.model('Cocktail',CocktailSchema);
export default Cocktail;