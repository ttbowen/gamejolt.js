const chai = require('chai');
const expect = chai.expect;

const cloneObject = require('../../src/util/CloneObject');

describe('cloneObject', () => {
  it('should return a copy of the passed object', () => {
    const originalObject = {
      test: 'test'
    };
    const clonedObject = cloneObject(originalObject);
    expect(clonedObject).to.eql(originalObject);
    expect(clonedObject).to.not.equal(originalObject);
  });
});
