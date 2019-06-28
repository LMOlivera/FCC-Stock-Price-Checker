var chaiHttp = require('chai-http');
var chai = require('chai');
var expect = require('chai').expect;
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() { // 7 - Functional testing
    
    suite('GET /api/stock-prices => stockData object', function() {
      
      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices?stock=Apple')
        .end(function(err, res){
         assert.equal(res.status, 200);
         assert.equal(res.body.stock, "Apple");
         done();
        });
      });
      
      test('1 stock with like', function(done) {
         chai.request(server)
        .get('/api/stock-prices?stock=Test&like=true')
        .end(function(err, res){
           assert.equal(res.status, 200);
           assert.equal(res.body.stock, "Test");
           assert.equal(res.body.likes, "1");
           done();
        });
      });
      
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
        chai.request(server)
        .get('/api/stock-prices?stock=Test&like=true')
        .end(function(err, res){
           assert.equal(res.status, 200);
           assert.equal(res.body.error, "You already liked this!");
           done();
        });
      });
      
      test('2 stocks', function(done) {
        chai.request(server)
        .get('/api/stock-prices?stock=Apple&stock=Banana')
        .end(function(err, res){
           assert.equal(res.status, 200);
           assert.equal(res.body[0].stock, "Apple");
           assert.equal(res.body[1].stock, "Banana");
           done();
        });
      });      
    });
});
