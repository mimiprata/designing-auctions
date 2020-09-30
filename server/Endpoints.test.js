const chai = require('chai');
const  chaiHttp = require( 'chai-http');
const app = require( '../server/server');
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Tokens", () => {
    describe("GET /", () => {
        it("should get all tokens for a user", (done) => {
            const username = "mimi";
            chai.request(app)
                .get(`/api/token/myTokens/${username}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to get single student record
        it("should not get a single student record", (done) => {
            const id = 5;
            chai.request(app)
                .get(`/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});