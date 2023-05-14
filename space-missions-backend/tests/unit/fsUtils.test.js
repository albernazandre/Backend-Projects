// exemplo de teste unitario

const { expect } = require('chai');

const { readMissionsData } = require('../../src/utils/fsUtils');

describe('A funcao readMissionsData', function () {
    it('retorna um array', async function () {
        const missions = await readMissionsData();

        expect(missions).to.be.instanceOf(Array);
    });
});
