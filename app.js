const express = require('express');
const connectDB = require('./config/db');
const { engine } = require('express-handlebars')
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');
// Import routers
const posts = require('./routers/posts');
// Active express app
const app = express();
// Active Handlebars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// Active body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Active method override middleware
app.use(methodOverride('_method'));
app.use("/images", express.static(path.join(__dirname, "/public/images")));
// Express middleware
app.use(express.json());
// Connect Database

connectDB();
// Mot so routers co ban co the dua vao file rieng trong thu muc routes
app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));
// Using routes
app.use('/posts', posts);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
