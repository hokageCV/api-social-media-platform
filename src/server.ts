import express, { Request, Response } from 'express';

import cors from 'cors';
import morgan from 'morgan';
import router from './routes';

const app = express();

app.use(cors());
app.use(morgan(':date[web] ⌛ :method :url :status ⚫ :response-time ms - :res[content-length]'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'RASENGAN' });
});

app.use('/api', router);

export default app;
