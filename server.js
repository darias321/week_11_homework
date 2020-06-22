const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// the browser is getting data from express server

app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/notes", function (req, res) {
  res.sendFile(__dirname + "/public/notes.html");
});

app.get("/api/notes", function (req, res) {
  res.sendFile(__dirname + "/db/db.json");
});

app.get("*", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/api/notes", function (req, res) {
  console.log(req.body);

  const { title, text } = req.body;

  var notes = fs.readFileSync(__dirname + "/db/db.json");
  notes = JSON.parse(notes);

  notes.push({
    id: notes.length,
    title: title,
    text: text,
  });
  fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(notes));
  res.json(notes);
});

app.delete("/api/notes/:id", function (req, res) {
  const id = req.params.id;

  var notes = fs.readFileSync(__dirname + "/db/db.json");
  notes = notes.filter(function (note) {
    if (note.id === Number(id)) {
      return false;
    }

    return true;
  });
  fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(notes));
  res.json(notes);
});

app.listen(3000, () => {
  console.log(
    "Express server listening on port http://localhost:" + PORT + "."
  );
});
