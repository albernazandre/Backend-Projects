// exemplo de teste unitario

const { expect } = require('chai');

const fs = require('fs');
const sinon = require('sinon');
const { readMissionsData } = require('../../src/utils/fsUtils');

// length de 3 objetos da nossa base
const mockMissions = JSON.stringify([
    {
        id: 1,
        name: 'Mariner 2',
        year: 1962,
        country: 'USA',
        destination: 'Vênus',
    }, {
        id: 2,
        name: 'Venera 4',
        year: 1967,
        country: 'URSS',
        destination: 'Vênus',
    }, {
        id: 3,
        name: 'Mariner 5',
        year: 1967,
        country: 'USA',
        destination: 'Vênus',
    },
]);

describe('A funcao readMissionsData', function () {
    it('retorna um array', async function () {
        sinon.stub(fs.promises, 'readFile').resolves(mockMissions);
        const missions = await readMissionsData();

        expect(missions).to.be.instanceOf(Array);
        expect(missions).to.have.lengthOf(3);
        // desfaz simulacao
        sinon.restore();
    });
});
