import index = require('../src/index');
import * as chai from 'chai';

const expect = chai.expect;
describe('index - Reporter', () => {
  it('should provide Reporter', () => {
    expect(index.Reporter).to.not.be.undefined;
  });
});
