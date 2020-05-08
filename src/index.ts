import express from 'express';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import api from './api/api';

const app = express();

app.use(morgan('common'));
app.use(express.static('frontend/dist/spa'));
app.use(bodyParser.json());
app.use('/api', api);
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/dist/spa/index.html`));
});

const MONGOOSE_DB = process.env.MONGOOSE_DB || 'seabury-suggestions-dev';
const MONGOOSE_URI = process.env.MONGOOSE_URI || `mongodb://localhost/${MONGOOSE_DB}`;

mongoose
  .connect(MONGOOSE_URI, { useNewUrlParser: true })
  .then(() => console.log('Mongoose connected'))
  .catch(() => console.error);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
