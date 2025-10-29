const express = require('express');
const dotenv=require('dotenv');
const cors = require('cors');
const connectToDB = require('./config/db');
const userRouter = require('./routes/user.route');
const resumeRouter = require('./routes/resume.route');


dotenv.config();
connectToDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=> res.send("Resume Builder API is running... "));

app.use("/api/users",userRouter);
app.use("/api/resumes",resumeRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})