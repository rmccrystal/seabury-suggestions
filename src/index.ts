import express from 'express';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import api from './api/api';
import {genSalt, hash} from "bcrypt";
import UserModel from "./models/UserModel";

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

async function createDefaultUser(username: string, password: string) {
  const users: Document[] | any[] = await UserModel.find({username}).exec();
  if(users.map(user => user.username).includes(username)) {
      console.log("didn't need to create user")
    return
  }
  const passwordHash = await hash(password, await genSalt(10));

  const newUser = new UserModel({
    username,
    password: passwordHash,
    roles: ['admin']
  });

  // save new user to database
  await newUser.save();
}

createDefaultUser('ryan', 'ZarE3Hh6abg9xa')

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
