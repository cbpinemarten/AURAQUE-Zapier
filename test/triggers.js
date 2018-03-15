require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('triggers', () => {

  describe('new order trigger', () => {
    it('should load orders', (done) => {
      const bundle = {
        inputData: {
          status: 'Pending'
        }
      };

      appTester(App.triggers.order.operation.perform, bundle)
        .then(results => {
          results.length.should.above(0);

          const firstorder = results[0];
          firstorder.name.should.eql('name 2');
          firstorder.directions.should.eql('directions 2');

          done();
        })
        .catch(done);
    });

    it('should load orders without filters', (done) => {
      const bundle = {};

      appTester(App.triggers.order.operation.perform, bundle)
        .then(results => {
          results.length.should.above(1);

          const firstorder = results[0];
          firstorder.name.should.eql('name 1');
          firstorder.directions.should.eql('directions 1');

          done();
        })
        .catch(done);
    });
  });

});
