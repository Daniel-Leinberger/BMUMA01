const express = require("express");

const app = express();
const port = 3000;

// EJS als Template-Engine festlegen
app.set("view engine", "ejs");

// Formulardaten lesbar machen
app.use(express.urlencoded({ extended: false }));

// Dateien aus dem Ordner "public" bereitstellen
app.use(express.static("public"));

app.get("/", (request, response) => {
    console.log("GET / wurde aufgerufen.");

    response.render("index", {
        submittedTodo: ""
    });
});

app.post("/newtodo", (request, response) => {
    console.log("POST /newtodo wurde aufgerufen.");
    console.log("Empfangene Formulardaten:", request.body);

    let todo = "<input type='checkbox' value='"

        todo +=
        typeof request.body.todo === "string"
            ? request.body.todo.trim()
            : "";
    todo+="'/>"

    response.render("index", {
        submittedTodo: todo
    });
});

app.listen(port, () => {
    console.log(
        `Express-Server läuft unter http://localhost:${port}`
    );
});