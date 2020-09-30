import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/IndexRoute';
var fs = require('fs')
var https = require('https')
export const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('app'));

app.use(express.static('build'));

app.use('/api', routes);

app.get('*',(req,res)=>{
    res.status(404);
    res.send('Oooops, this doesnt exist');
});


https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
    .listen(3001, function () {
        console.log('Example app listening on port 3000! Go to https://localhost:3001/')
    });