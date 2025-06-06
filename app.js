const express = require('express');
const dotenv = require("dotenv")
dotenv.config()
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const path = require("path");
const cors = require('cors'); 
const multer = require("multer");
const tokenvalidator=require('./middlewares/jwtMiddleware_admin');
const very_token_user=require('./middlewares/jwtMiddleware_user');
const verifyToken_user_admin=require('./middlewares/jwtMiddleware_user_admin');
const port = process.env.PORT || 3000;
const BASE_URL=process.env.BASE_URL;
// Middleware
app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  origin: '*',
  allowedHeaders: ['Content-Type','Authorization']
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import the router
const authRoutes = require('./router/authentication');
const appointment= require('./router/appointment');// Adjust the path as needed
const artist=require('./router/appointment_list')
const pdf=require('./router/pdf')
const Identity=require('./router/Identity')



// Use the router for routes
app.use('/', authRoutes);
app.use('/appointment',appointment);
app.use('/artist',artist);
app.use('/pdf',pdf);
app.use('/Identity',Identity)

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    console.log(file.originalname)
    const ext = path.extname(file.originalname) || '.jpg';
      return  cb(null, `${file.fieldname}_${Date.now()}${ext}`);
      // cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage
})
app.use('/profile', express.static('upload/images'));
app.post("/upload",verifyToken_user_admin,upload.single('profile'), (req, res) => {

  res.json({
      success: 1,  
      profile_url: `${BASE_URL}profile/${req.file.filename}`
  })
})

function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
      res.json({
          success: 0,
          message: err.message
      })
  }
}
app.use(errHandler);



const httpServer = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

httpServer.setTimeout(120000);
