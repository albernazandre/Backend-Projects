// testes de integracao

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

const app = require('../../src/app');

describe('Rota de missoes', function () {
    describe('GET /missions', function () {
        it(' retorna uma list de missoes', async function () {
            const response = await chai.request(app).get('/missions');

             expect(response.status).to.be.equal(200);
             expect(response.body).to.haveOwnProperty('missions');
             expect(response.body.missions).to.be.instanceOf(Array);
        });          
    });
    describe('POST /missions', function () {
        it(' retorna a missao criada com um id', async function () {
            const myMockMission = {
                name: 'Space Sauce',
                year: '2023',
                country: 'Brasil',
                destination: 'Titã',
               };
            const response = await chai.request(app)
               .post('/missions').send(myMockMission);

             expect(response.status).to.be.equal(201);
             expect(response.body).to.haveOwnProperty('mission');
             expect(response.body.mission).to.haveOwnProperty('id');
             expect(response.body.mission.name).to
                .equal(myMockMission.name);
             expect(response.body.mission.year).to
                .equal(myMockMission.year);
            expect(response.body.mission.country).to
                .equal(myMockMission.country);
            expect(response.body.mission.destination).to
                .equal(myMockMission.destination);   
        });          
    });
});