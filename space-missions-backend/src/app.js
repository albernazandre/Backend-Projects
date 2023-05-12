// src/app.js
// chamando o framework express
const express = require('express');
const {
    readMissionsData,
    writeNewMissionData,
    updateMissionData,
    deleteMissionData, 
} = require('./utils/fsUtils');

const app = express();

// pega dados do body
app.use(express.json());

// criando endpoints => CRUD

// read
app.get('/missions', async (req, res) => {
  const missions = await readMissionsData();

  return res.status(200).json({ missions });
});

// create
app.post('/missions', async (req, res) => {
    const newMission = req.body;
    // console.log(newMission);

    const newMissionWithId = await writeNewMissionData(newMission);
    return res.status(201).json({ mission: newMissionWithId });
});

// update

app.put('/missions/:id', async (req, res) => {
    const { id } = req.params;
    const updatedMissionData = req.body;

    const updatedMission = await updateMissionData(Number(id), updatedMissionData);

    return res.status(201).json({ mission: updatedMission });
});

// delete

app.delete('/missions/:id', async (req, res) => {
  const { id } = req.params;
  await deleteMissionData(Number(id));

  return res.status(204).end();
});

module.exports = app;
