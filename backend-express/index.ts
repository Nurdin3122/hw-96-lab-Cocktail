import cors from 'cors';
import express from 'express';
import  mongoose from "mongoose";
import config from "./config";


const app = express();
const port = 8030;


app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use('/',);


const run = async () => {
    await mongoose.connect(config.db);
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
};
run().catch(console.error);