/**
 * Test script added to package.json
 * Running tests by 
 */

let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

/**
 * Example of using chai to test REST endpoint
 */
describe('/GET students', ()=>{
    it('it should get all the students', (done) => {
        chai.request(server)
            .get('/students')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
    })
})


/**
 * Basic test example
 */
describe('Array', ()=>{
    describe('#indexOf()', ()=>{
        it('should return -1 when the value is not present', ()=>{
            assert.equal([1,2,3].indexOf(4), -1);
        })
    })
})