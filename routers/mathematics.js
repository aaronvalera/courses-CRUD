// IMPORTATIONS
const express = require("express");
const mathematicsCourses = require("../data/courses").mathematicsCourses;
const mathematicsRouter = express.Router();
const {isIdDuplicate, findElement, orderByViews} = require("../utils/utils");

// --- MATHEMATICS COURSES ROUTING ---
mathematicsRouter.get("/", (req, res) => {
    let array = mathematicsCourses;
    if(req.query.sort === "views"){
        array = orderByViews(mathematicsCourses, "views");
    }
   return res.json(array);
});

mathematicsRouter.get("/:subject", (req, res) => {
    const subject = req.params.subject;
    const result = mathematicsCourses.filter(course => course.subject === subject);
    if(result.length === 0) {
        return res.status(404).json({message: `Courses of '${subject}' were not found.`});
    }
    res.json(result);
});

mathematicsRouter.get("/:subject/:level", (req, res) => {
    const subject = req.params.subject;
    const level = req.params.level;
    const result = mathematicsCourses.filter(course => course.subject === subject && course.level === level);
    if(result.length === 0) {
       return res.status(404).json({message: `Courses of '${subject}' of level '${level}' were not found.`});
    }
    res.json(result);
});

// POST METHOD
mathematicsRouter.post("/", (req, res) => {
    const newCourse = req.body;
    const newCourseID = req.body.id;
    if(isIdDuplicate(mathematicsCourses, newCourseID)) {
        return res.status(400).json({error: `A course with the id '${newCourseID}' already exists.`});
    }
    if(newCourseID === undefined) {
        return res.status(400).json({error: `The field 'id' is required.`});
    }
    mathematicsCourses.push(newCourse);
    mathematicsCourses.sort((a, b)=> a.id - b.id);
    res.status(201).json({message: `Course with id '${newCourseID}' has been successfully added.`,
    data: mathematicsCourses});
});

// PUT METHOD
mathematicsRouter.put("/:id", (req, res) => {
    const modifiedCourse = req.body;
    const modifiedCourseID = req.params.id;
    const index = findElement(mathematicsCourses, modifiedCourseID);
        if(index >= 0) {
            const idExists = mathematicsCourses.some((course, position) => course.id === parseFloat(modifiedCourse.id) && position !== index);
            if (idExists) {
                return res.status(400).json({error: `The id '${modifiedCourse.id}' is already in use by another course.`});
            }
            mathematicsCourses[index] = modifiedCourse;
            res.json({message: `The course with the id '${modifiedCourseID}' has been successfully modified.`,
            data: mathematicsCourses});
        } else {
            res.status(404).json({error: `The course with the id ${modifiedCourseID} was not found.`});
        }
});

// PATCH METHOD
mathematicsRouter.patch("/:id", (req, res) => {
    const updatedCourse = req.body;
    const updatedCourseID = req.params.id;
    const index = findElement(mathematicsCourses, updatedCourseID);
    if(index >= 0) {
        if (updatedCourse.id !== undefined) {
            const idExists = mathematicsCourses.some((course, position) => course.id === parseFloat(updatedCourse.id) && position !== index);
            if (idExists) {
                return res.status(400).json({error: `The id '${updatedCourse.id}' is already in use by another course.`});
            }
        }
        Object.assign(mathematicsCourses[index], updatedCourse);
        res.json({message: `The course with the id '${updatedCourseID}' has been successfully partially updated.`,
        data: mathematicsCourses});
    } else {
        res.status(404).json({error: `The course with the id '${updatedCourseID}' was not found.`});
    }
});

// DELETE METHOD
mathematicsRouter.delete("/:id", (req, res) => {
    const deletedCourseID = req.params.id;
    const index = findElement(mathematicsCourses, deletedCourseID);
    if(index >= 0) {
        mathematicsCourses.splice(index, 1);
        res.json({message: `The course with the id '${deletedCourseID}' was succesfully deleted.`,
        data: mathematicsCourses});
    } else {
        res.status(404).json({error:`The course with the id '${deletedCourseID}' was not found.`});
    }
});

module.exports = mathematicsRouter;