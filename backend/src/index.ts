import express from 'express';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import api from './api/api';

const app = express();

app.use(morgan('common'));
app.use(express.static('../frontend/dist/spa'));
app.use(bodyParser.json());
app.use('/api', api);
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../../frontend/dist/spa/index.html`));
});

const MONGOOSE_URI = 'mongodb+srv://draven:sNIsOk5iJxCmlQtf@cluster0-yccmv.mongodb.net/seabury-suggestions-dev?retryWrites=true&w=majority' || process.env.MONGOOSE_URI;

mongoose
  .connect(MONGOOSE_URI, { useNewUrlParser: true })
  .then(() => console.log('Mongoose connected'))
  .catch(() => console.error);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
