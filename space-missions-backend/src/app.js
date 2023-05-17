// src/app.js
// chamando o framework express
const express = require('express');
const {
    updateMissionData,
    deleteMissionData,
} = require('./utils/fsUtils');

require('express-async-errors');

const {
  insert,
  findAll,
} = require('./db/missionsDb');

const app = express();

// middlewares - funcoes a serem utilizadas "no meio da logica"
const validateMissionId = (req, res, next) => {
  const { id } = req.params;

  const idAsNumber = Number(id);
  if (Number.isNaN(idAsNumber)) {
    res.status(400).send({ message: 'ID inválido! Precisa ser number' });
  } else {
    next();
  }
};

const validateMissionData = (req, res, next) => {
  const requiredProperties = ['name', 'year', 'country', 'destination'];

  if (requiredProperties.every((property) => property in req.body)) {
    next();
  } else {
    res.status(400).send({ message: 'A missao precisa receber todos os atributos' });
  }
};

// pega dados do body
app.use(express.json());

// criando endpoints => CRUD
// read
app.get('/missions', async (req, res) => {
  const missions = await findAll();

  return res.status(200).json({ missions });
});

// create
app.post('/missions', validateMissionData, async (req, res) => {
    const newMission = req.body;

    const newMissionWithId = await insert(newMission);
    return res.status(201).json({ mission: newMissionWithId });
});

// update
app.put('/missions/:id', validateMissionId, validateMissionData, async (req, res) => {
    const { id } = req.params;
    const updatedMissionData = req.body;

    const updatedMission = await updateMissionData(Number(id), updatedMissionData);

    return res.status(201).json({ mission: updatedMission });
});

// delete
app.delete('/missions/:id', validateMissionId, async (req, res) => {
  const { id } = req.params;
  await deleteMissionData(Number(id));

  return res.status(204).end();
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  next(error);
});

app.use((err, req, res, _next) => {
  res.status(500).send({ message: 'Eita, deu ruim!' });
});

module.exports = app;
