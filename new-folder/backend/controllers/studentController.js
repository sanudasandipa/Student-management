const Student = require('../models/Student');

// Create a new student
const createStudent = async (req, res) => {
    try {
        const { name, image, age, status } = req.body;
        const newStudent = new Student({ name, image, age, status });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error });
    }
};

// Get all students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
};

// Get a student by ID
const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student', error });
    }
};

// Update a student by ID
const updateStudent = async (req, res) => {
    try {
        const { name, image, age, status } = req.body;
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { name, image, age, status },
            { new: true }
        );
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error });
    }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error });
    }
};

// Toggle student status (Active/Inactive)
const toggleStudentStatus = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        student.status = student.status === 'Active' ? 'Inactive' : 'Active';
        await student.save();
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error toggling student status', error });
    }
};

module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    toggleStudentStatus
};
