// IMPORTATIONS
const express = require("express");
const programmingCourses = require("../data/courses.js").programmingCourses;
const programmingRouter = express.Router();
const {isIdDuplicate, findElement, orderByViews} = require("../utils/utils.js");

// --- PROGRAMMING COURSES ROUTING ---
programmingRouter.get("/", (req, res) => {
    let array = programmingCourses;
    if(req.query.sort === "views") {
        array = orderByViews(programmingCourses, "views");
    }
    res.json(array);
});

programmingRouter.get("/:language", (req, res) => {
    const language = req.params.language;
    const result = programmingCourses.filter(course => course.language === language);
    if(result.length === 0) {
        return res.status(404).json({message: `Courses of '${language}' were not found.`});
    }
    res.json(result);
});

programmingRouter.get("/:language/:level", (req, res) => {
    const language = req.params.language;
    const level = req.params.level;
    const result = programmingCourses.filter(course => course.language === language && course.level === level);
    if(result.length === 0) {
        return res.status(404).json({message: `Courses of '${language}' of level '${level}' were not found.`});
    }
    res.json(result);
});

// POST METHOD
programmingRouter.post("/", (req, res) => {
    const newCourse = req.body;
    const newCourseID = req.body.id;
    if(isIdDuplicate(programmingCourses, newCourseID)) {
        return res.status(400).json({error: `A course with the id '${newCourseID}' already exists.`});
    }
    if(newCourseID === undefined) {
        return res.status(400).json({error: `The field 'id' is required.`});
    }
    programmingCourses.push(newCourse);
    programmingCourses.sort((a, b) => a.id - b.id);
    res.status(201).json({message: `Course with id '${newCourseID}' has been successfully added.`,
    data: programmingCourses});
});

// PUT METHOD
programmingRouter.put("/:id", (req, res) => {
    const modifiedCourse = req.body;
    const modifiedCourseID = req.params.id;
    const index = findElement(programmingCourses, modifiedCourseID);
    if(index >= 0) {
        const idExists = programmingCourses.some((course, position) => course.id === parseFloat(modifiedCourse.id) && position !== index);
        if (idExists) {
            return res.status(400).json({error: `The id '${modifiedCourse.id}' is already in use by another course.`});
        }
        programmingCourses[index] = modifiedCourse;
        res.json({message: `The course with the id '${modifiedCourseID}' has been successfully modified.`,
        data: programmingCourses});
    } else {
        res.status(404).json({error: `The course with the id ${modifiedCourseID} was not found.`});
    }
});

// PATCH METHOD
programmingRouter.patch("/:id", (req, res) => {
    const updatedCourse = req.body;
    const updatedCourseID = req.params.id;
    const index = findElement(programmingCourses, updatedCourseID);
    if(index >= 0) {
        if (updatedCourse.id !== undefined) {
            const idExists = programmingCourses.some((course, position) => course.id === parseFloat(updatedCourse.id) && position !== index);
            if (idExists) {
                return res.status(400).json({error: `The id '${updatedCourse.id}' is already in use by another course.`});
            }
        }
        Object.assign(programmingCourses[index], updatedCourse);
        res.json({message: `The course with the id '${updatedCourseID}' has been successfully partially updated.`,
        data: programmingCourses});
    } else {
        res.status(404).json({error: `The course with the id '${updatedCourseID}' was not found.`});
    }
});

// DELETE METHOD
programmingRouter.delete("/:id", (req, res) => {
    const deletedCourseID = req.params.id;
    const index = findElement(programmingCourses, deletedCourseID);
    if(index >= 0) {
        programmingCourses.splice(index, 1);
        res.json({message: `The course with the id '${deletedCourseID}' was succesfully deleted.`,
        data: programmingCourses});
    } else {
        res.status(404).json({error:`The course with the id '${deletedCourseID}' was not found.`});
    }
});


module.exports = programmingRouter;