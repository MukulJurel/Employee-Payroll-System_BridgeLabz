const express = require("express");
const path = require("path");
const fileHandler = require("./modules/fileHandler");

const app = express();
const PORT = 8000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
    const employees = await fileHandler.read();
    res.render("index", { employees });
});

app.get("/add", (req, res) => {
    res.render("add");
});

app.post("/add", async (req, res) => {
    const employees = await fileHandler.read();

    const newEmployee = {
        id: employees.length + 1,
        name: req.body.name,
        department: req.body.department,
        basicSalary: Number(req.body.basicSalary)
    };

    employees.push(newEmployee);
    await fileHandler.write(employees);

    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});