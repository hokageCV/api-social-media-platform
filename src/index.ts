import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './server';
import ENV from './utils/env';

const PORT = ENV.PORT || 3000;

(async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log('DB CONNECTED');

        app.on('error', (err) => {
            console.error('ERROR: ', err);
            throw err;
        });

        const onListening = () => console.log(`Listening on ${PORT}👂👂`);

        app.listen(PORT, onListening);
    } catch (err) {
        console.error('ERROR: ', err);
        throw err;
    }
})();
