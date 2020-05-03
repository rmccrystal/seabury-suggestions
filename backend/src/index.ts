import express from 'express';
import morgan from 'morgan';
import api from './api/api'
import path from "path";

const app = express();

app.use(morgan('common'));
app.use(express.static('../frontend/dist/spa'));
app.use(api);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'../frontend/dist/spa/index.html'))
});

const port = 3000 || process.env['PORT'];
app.listen(port, () => {
    console.log(`Backend running on port ${port}`)
})
