import express from "express";
import { getAllEmployees, getEmployee, createEmployee } from "./database.js";

const app = express();
app.use(express.json());

app.get("/employees", async (req, res) => {
    const allEmployees = await getAllEmployees();
    res.send(allEmployees);
});
app.get("/employee/:id", async (req, res) => {
    const id = req.params.id;
    const employee = await getEmployee(id);
    res.send(employee);
});
app.post("/employees", async (req, res) => {
    const { id, area } = req.body;
    const employee = await createEmployee(id, area);
    res.status(201).send(employee);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
