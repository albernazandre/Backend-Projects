const fs = require('fs').promises;
const path = require('path');

const MISSION_DATA_PATH = '../../data/missions.json';

async function readMissionsData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, MISSION_DATA_PATH));
    const missions = JSON.parse(data);
    
    return missions;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error.message}`);
  }
}

async function writeNewMissionData(newMission) {
    try {
        const oldMissions = await readMissionsData();
        const newMissionWithId = { id: Date.now(), ...newMission };
        const allMissions = JSON.stringify([...oldMissions, newMissionWithId]);

        await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), allMissions);
        return newMissionWithId;
    } catch (error) {
        console.error(`Erro na escrita do arquivo: ${error.message}`);
    }
}

async function updateMissionData(id, updatedMissionData) {
  const oldMissions = await readMissionsData();
  const updatedMission = { id, ...updatedMissionData };
  const updatedMissions = oldMissions.reduce((missionsList, currentMission) => {
    if (currentMission.id === updatedMission.id) return [...missionsList, updatedMission];
    return [...missionsList, currentMission];
  }, []);

  const updatedData = JSON.stringify(updatedMissions);

  try {
    await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), updatedData);
    console.log(`Atualizou missao com o id: ${id}`);

    return updatedMission;
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error.message}`);
  }
}

async function deleteMissionData(id) {
  const oldMissions = await readMissionsData();
  const updatedMissions = oldMissions.filter((currentMission) => currentMission.id !== id);

  const updatedData = JSON.stringify(updatedMissions);
  try {
    await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), updatedData);
    console.log(`Deletou missao com o id: ${id}`);
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error.message}`);
  }
}

module.exports = {
    readMissionsData,
    writeNewMissionData,
    updateMissionData,
    deleteMissionData,
};
