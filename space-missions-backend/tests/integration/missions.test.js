// testes de integracao

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

chai.use(chaiHttp);
const { expect } = chai;

const app = require('../../src/app');
const connection = require('../../src/db/connection');

const mockMissions = [
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
];

describe('Rota de missoes', function () {
    describe('GET /missions', function () {
        it(' retorna uma list de missoes', async function () {
            sinon.stub(connection, 'execute').resolves(mockMissions);
            const response = await chai.request(app).get('/missions');

             expect(response.status).to.be.equal(200);
             expect(response.body).to.haveOwnProperty('missions');
             expect(response.body.missions).to.be.instanceOf(Array);
             expect(response.body.missions).to.have.lengthOf(3);
             // desfaz simulacao
             sinon.restore();
        });          
    });
    describe('POST /missions', function () {
        const myMockMission = {
            name: 'Space Sauce',
            year: '2023',
            country: 'EUA',
            destination: 'Titã',
           };
        
        beforeEach(function () {
            const mockId = 42;

            sinon.stub(connection, 'execute')
              .onFirstCall()
              .resolves([{ insertId: mockId }])
              .onSecondCall()
              .resolves([{ id: mockId, ...myMockMission }]);
        });
    
        afterEach(sinon.restore);

        it(' retorna a missao criada com um id', async function () {
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
            // sinon.restore(); 
        });
        it('Escreve a nova missão no banco de dados sql', async function () {
            await chai.request(app).post('/missions').send(myMockMission);

            expect(connection.execute.calledTwice).to.be.equal(true);
        });          
    });
});