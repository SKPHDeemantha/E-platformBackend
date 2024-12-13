import Student from "../models/student.js";


export function getStudents(req,res){

    Student.find().then(
        (studentList)=>{
            res.json({
                list : studentList
            })
        })        
}
export function createStudent(req,res){
    const student = new Student(req.body)
    student.save().then(()=>{
        res.json({
            message : "Student created"
        })
    }).catch(()=>{
        res.json({
            message :"student not created"
        })
     })
}

// export async function createStudent(req, res) {
//     try {
//         const student = new Student(req.body);
//         await student.save();
//         res.json({
//             message: "Student created"
//         });
//     } catch (error) {
//         res.json({
//             message: "Student not created",
//             error: error.message // Optional: Include the error message for debugging
//         });
//     }
// }