const connection = require('./connection');

// findAll é atrelado ao metodo GET que retorna todos elementos do banco
const findAll = async () => {
  const missions = connection.execute('SELECT * FROM missions');

  return missions;
};

const findById = async (id) => {
  const [mission] = await connection.execute('SELECT * FROM missions WHERE id = ?', [id]);
  // console.log(mission);
  return mission;
};

const insert = async ({ name, year, country, destination }) => {
  const [{ insertId }] = await connection
  .execute(
`INSERT INTO missions
    (name, year, country, destination) VALUES (?, ?, ?, ?)`,
    [name, year, country, destination],
  );

  return findById(insertId);
};

module.exports = {
  insert,
  findAll,
  findById,
};
