const express = require("express");
const coursesInfo = require("./data/courses.js");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware

// IMPORT ROUTERS
const programmingRouter = require("./routers/programming.js");
app.use("/api/courses/programming", programmingRouter);
const mathematicsRouter = require("./routers/mathematics.js");
app.use("/api/courses/mathematics", mathematicsRouter);

// ENDPOINTS
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the courses CRUD API.",
        status: "online",
        documentation: "Please make sure to read the README.md file carefully for detailed documentation on available endpoints and usage."
    })
});

app.get("/api/courses", (req, res) => {
    res.json(coursesInfo);
});

// CATCH-ALL
app.use((req, res) => {
    res.status(404).json({ 
        error: "Endpoint not found.", 
        message: "The requested URL does not exist on this server. Please check the documentation." 
    });
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});