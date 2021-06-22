const {Router} = require('express')
const fs = require("fs")
const config = require('config')
const {check, validationResult} = require('express-validator')
const Video = require('./models/Series')
const Picture = require('./models/Picture')
const router = Router()

router.post("video/add", async (req, res) => {
  
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }

  // accessing the file
  const myFile = req.files.file;

  const video = new Video({Ext: myFile.split('.').pop()})

  await video.save()

  //  mv() method places the file inside public directory
  myFile.mv(`${__dirname}/public/${video._id}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "Error occured" });
      }
      // returing the response with file path and name
      return res.send({id: video._id});
  });

})

router.post("image/add", async (req, res) => {
    
})

router.get("/image/:imageId", async (req, res) => {

    const pic = await Picture.findById(req.params.imageId)

    const imagePath = __dirname + '/public/pictures/' + req.params.imageId + "." + pic.Ext; 

    res.set("Content-Type", "image/"+pic.Ext);
    res.sendFile(imagePath)

})

router.get("/video/:videoId", function (req, res) {

    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }

    const videoPath = __dirname + '/public/video/' + req.params.videoId + ".mp4"; 
    const videoSize = fs.statSync(videoPath).size;
  
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

router.put("/video/del/:videoId", async (req, res) => {
   
})

router.put("/image/del/:imageId", async (req, res) => {
   
})

module.exports = router
