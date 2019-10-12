import express from 'express'; // фреймворк для создания сервера
import dotenv from 'dotenv';   // для работы с .env файлами которые содержат переменные окружения - конф. инфу, например токены
import mongoose from 'mongoose'; //
import bodyParser from 'body-parser';

import defaultRouter from './routes/default.js';
import rout_todo from './routes/todo.js';
import rout_notes from './routes/notes.js';

const app = express();
const config = dotenv.config().parsed;

try {
        mongoose
        .connect(
            config.DB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        .then(() => {
            app.set('view engine', config.TEMPLATE_ENGINE);
            app.set('views', config.TEMPLATE_VIEW_PATH);

            app.use((req, res, next) => {
                // set headers
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

                next();
            });

            app.use(express.static(config.PUBLIC_ROOT));
            app.use(bodyParser.urlencoded({extended: false}));
            app.use(bodyParser.json());

            app.use('/', defaultRouter());
            app.use('/api/notes', rout_todo());
            app.use('/notes', rout_notes());

            app.listen(config.PORT, err => {
                if (err) {
                    throw new Error(err);
                }

                console.log('Nodejs server is started');
            });

        })
        .catch(error => {
            console.log('Error!!!', error);
        });


} catch (e) {
    console.log(e);
}