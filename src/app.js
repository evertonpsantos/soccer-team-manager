const express = require('express');

const app = express();

app.use(express.json());

const teams = [
  {
    id: 1,
    name: 'São Paulo Futebol Clube',
    initials: 'SPFC',
  },
  {
    id: 2,
    name: 'Clube Atlético Mineiro',
    initials: 'CAM',
  },
];

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!!!' });
});

app.get('/teams', (req, res) => {
  res.status(200).json(teams);
});

app.get('/teams/:id', (req, res) => {
  const idParams = req.params.id;
  const foundTeam = teams.find((team) => team.id === Number(idParams));
  res.status(200).json(foundTeam);
});

app.post('/teams', (req, res) => {
  const newTeam = { ...req.body };
  teams.push(newTeam);
  res.status(201).json({ message: 'Criado com sucesso' });
});

app.put('/teams/:id', (req, res) => {
  const paramsId = req.params.id;
  const { name, initials } = req.body;

  const updateTeam = teams.find((team) => team.id === Number(paramsId));

  if (!updateTeam) return res.status(404).json({ message: 'Team not found!' });

  updateTeam.name = name;
  updateTeam.initials = initials;
  res.status(200).json({ updateTeam });
});

app.delete('/teams/:id', (req, res) => {
  const idParams = req.params.id;
  const positionInArray = teams.findIndex((team) => team.id === Number(idParams));
  teams.splice(positionInArray, 1);
  res.status(200).end();
});

module.exports = app;