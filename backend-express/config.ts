import path from "path";
import {configDotenv} from "dotenv";
import {CorsOptions} from "cors";



const rootPath = __dirname;

configDotenv();


const corsWhiteList =  ['http//:localhost:5173']

const corsOption:CorsOptions = {
    origin:(origin,callback) => {
        if(!origin || corsWhiteList.indexOf(origin) !== -1) {
            callback(null,true);
        } else {
            callback(new Error("Not allowed by cors"));
        }
    }
}



const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    corsOption,
    db: 'mongodb://localhost/cocktail-app'
};



export default config;