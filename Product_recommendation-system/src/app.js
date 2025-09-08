import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import router from './router/router.js';
import productRouter from './router/productRouter.js';
import categoryRouter from './router/categoryRout.js';
import subCategoryRouter from './router/SubCatagoryRouter.js';
import userRouter from './router/userRouter.js';
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); 
// app.use('/', router);
// import session from 'express-session';

// app.use(session({
//   secret: 'your-secret-key', // keep this secret and complex
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // set true only for HTTPS
// }));

import session from 'express-session';
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
configDotenv();

app.use(session({
  secret: 'your_secret_key', // change this to a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 // 1 hour in milliseconds
  }
}));
// ✅ Allow React running on Vite (5173)
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected with React 🚀" });
});

app.use('/', router);
app.use('/', productRouter); // Assuming productRouter handles product-related routes
app.use('/', categoryRouter); // Assuming categoryRout handles category-related routes  
app.use('/', subCategoryRouter); // Assuming SubCatagoryRouter handles sub-category-related routes
app.use('/user', userRouter); // Assuming SubCatagoryRouter handles sub-category-related routes


export default app;