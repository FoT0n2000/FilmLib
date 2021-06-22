const {Router} = require('express')
const fs = require("fs")
const config = require('config')
const {check, validationResult} = require('express-validator')
const Title = require('../models/Title')
const User = require('../models/User')
const { join } = require('path')
const router = Router()

router.post("/add", async (req, res) => {
    try
    {
        const body = req.body
        const title = new Title({Name: body.Name, Description: body.description, Picture: body.picture, trailer: body.trailer, Series: body.series})

        await title.save()

        res.status(200).json({message: "title добавлен"})
    }
    catch{
        res.status(500).json({message: "что-то пошло не так"})
    }
})

router.get("/get/:titleId", async (req, res) => {
    try{
        if(req.params.titleId)
        {
            const title = await Title.findById(req.params.titleId)

            res.status(200).json({info: title})
        }
        else
        {
            res.status(500).json({message: "отсутствует Id"})
        }
    }
    catch{
        res.status(500).json({message: "что-то пошло не так"})
    }
})

router.get("/getAll", async (req, res) => {
    try{

        const title = await Title.find()

        res.status(200).json({titles: title})

    }
    catch{
        res.status(500).json({message: "что-то пошло не так"})
    }
})

router.get("/video/:videoId", function (req, res) {

    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }
  
    const videoPath = join(__dirname, '/../public/video/')+req.params.videoId; 
    const videoSize = fs.statSync("bigbuck.mp4").size;
  
    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  
    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
  
    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
  
    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });
  
    // Stream the video chunk to the client
    videoStream.pipe(res);
  });

router.get("/get/user/:userId", async (req, res) => {
    try{
        if(req.params.userId)
        {
            const user = await User.findById(req.params.userId)

            console.log(user)

            const titles = await Title.find({
                _id : {
                    "$in": user.favourites.map(f => f)
                }
            })

            res.status(200).json({favourites: titles})
        }
        else
        {
            res.status(500).json({message: "отсутствует список сериалов"})
        }
    }
    catch{
        res.status(500).json({message: "что-то пошло не так"})
    }
})

router.put("/del/:titleId", async (req, res) => {
   
})

router.put("/edit/:titleId", async (req, res) => {
    
})

module.exports = router
