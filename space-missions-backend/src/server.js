// src/server.js

// vou disparar a aplicacao
const app = require('./app');
const connection = require('./db/connection');

app.listen(3002, async () => {
    console.log('server running on port 3002');
    const [result] = await connection.execute('SELECT * FROM missions');
    console.log(result);
    // if (result) console.log('MySQL connection Ok!');
});
