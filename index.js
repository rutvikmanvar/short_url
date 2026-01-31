const express = require('express')

const {connectToMongo} = require('./connection')

const path = require('path');
const cookieParser = require('cookie-parser')
const urlRoute = require('./routes/url')
const userRoute = require('./routes/user')

const { checkForAuthentication, restrictTo } = require('./middlewares/auth')
const URL = require('./models/url')
const app = express();
const PORT = 8001;

connectToMongo('mongodb://localhost:27017/short_url')

app.set("view engine","ejs");
app.set('views',path.resolve('./views'));

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthentication)

app.get('/test',async(req,res) => {
    const allUrls = await URL.find({});
    return res.render('home',{
        urls:allUrls
    })
})

app.use("/url",restrictTo(['NORMAL']),urlRoute)
app.use('/user',userRoute)

app.get("/:shortId",urlRoute)

app.get('/analytics/:shortId',urlRoute)
app.get('/admin/urls',restrictTo(['ADMIN']), async (req,res) => {
    const allUrls = await URL.find({});
    return res.json({urls:allUrls})
})
app.listen(PORT,()=>{
    console.log('localhost:8001');
})