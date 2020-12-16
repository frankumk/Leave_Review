const express = require('express');
const {static} = express;
const path = require('path');

const {db, syncAndSeed, Category, Location, Review } = require('./db');

const app = express();

app.use('/dist',static(path.join(__dirname,'../dist')));
app.use('/assets',static(path.join(__dirname,'../assets')));
app.use(express.json());

app.get('/',(req,res,next)=> res.sendFile(path.join(__dirname,'../index.html')));


app.get('/api/reviews',async(req,res,next)=>{
    try{
        res.send(await Review.findAll({
            include: [Location]
        }))
    }catch(ex){
        next(ex);
    }
})

app.get('/api/categories',async(req,res,next)=>{
    try{
        res.send(await Category.findAll({
            order: [
                ['name','ASC']
            ]
        }))
    }catch(ex){
        next(ex)
    }
})

app.get('/api/locations',async(req,res,next)=>{
    try{
        res.send(await Location.findAll({
            include: [Category]
        }))
    }catch(ex){
        next(ex)
    }
})

app.post('/api/reviews',async(req,res,next)=>{
    try{
        console.log(req.body);
        const newPost = await Review.create(req.body)
        await newPost.save();
        res.send(newPost)
    }catch(ex){
        next(ex)
    }
})


app.get('/api/locations/:locid',async(req,res,next)=>{
    try{
        res.send(await Location.findByPk(req.params.locid));
    }catch(ex){
        next(ex);
    }
})

const init = async()=>{
    try{
        await db.authenticate();
        await syncAndSeed();

        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listening on port ${port}`));
    }catch(ex){
        console.log(ex);
    }
}

init();

module.exports = app;