const morgan = require("morgan");
const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));



let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },

  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/info", (req, res) => {
  const firstLine = `Phonebook has info for ${persons.length} people`;
  const secondLine = new Date();
  res.send(
    `${firstLine}<br/>
        ${secondLine}`
  );
});

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/persons/", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    res.status(400).json({ error: "name or number is missing" });
    return;
  }

  const existingPerson = persons.find((person) => person.name === body.name);
  if (existingPerson) {
    return res.status(400).json({ error: `name '${body.name}' already exists` });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person)
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end()
})

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
