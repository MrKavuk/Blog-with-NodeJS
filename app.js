const express = require('express');
const app = express();
const {connectionHelper} = require('./dbconnect/connectionHelper')

var path = require('path')

// routers require
const {routerHome} = require('./routes/homeRoutes')
const {routerAuth} = require('./routes/authRoutes')
const {routerBlog} = require('./routes/blogRoutes');

const port = 8080;
connectionHelper.connect()

app.set('view engine', 'ejs'); // html dosyalarını ejs olarak değiştiriyoruz ve içinde javascript yazabiliyoruz

app.listen(port, () => {
    console.log("Server started working")
})

app.use(express.static(path.join(__dirname, 'public')))

app.use('/home',routerHome)
app.use('/author',routerAuth)
app.use('/blog',routerBlog)
app.use((req, res) => {
    res.status(400).render('404')
})



