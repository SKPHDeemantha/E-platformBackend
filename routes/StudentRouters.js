import express from 'express';
import { createStudent, getStudents } from '../controllers/studentController.js';



const studentRouter =express.Router();

studentRouter.get("/",
    getStudents
)

studentRouter.post("/",
    createStudent
)
//wait

export default studentRouter