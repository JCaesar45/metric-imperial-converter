const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

suite('Unit Tests', function() {
  
  const convertHandler = new ConvertHandler();
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      const input = '32L';
      const result = convertHandler.getNum(input);
      assert.equal(result, 32);
      done();
    });
    
    test('Decimal number input', function(done) {
      const input = '3.1mi';
      const result = convertHandler.getNum(input);
      assert.equal(result, 3.1);
      done();
    });
    
    test('Fractional input', function(done) {
      const input = '1/2km';
      const result = convertHandler.getNum(input);
      assert.equal(result, 0.5);
      done();
    });
    
    test('Fractional input with decimal', function(done) {
      const input = '5.4/3lbs';
      const result = convertHandler.getNum(input);
      assert.approximately(result, 1.8, 0.001);
      done();
    });
    
    test('Error on double-fraction', function(done) {
      const input = '3/2/3kg';
      const result = convertHandler.getNum(input);
      assert.equal(result, 'invalid number');
      done();
    });
    
    test('Default to 1 when no numerical input', function(done) {
      const input = 'kg';
      const result = convertHandler.getNum(input);
      assert.equal(result, 1);
      done();
    });
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('Read valid input unit gal', function(done) {
      const input = '10gal';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'gal');
      done();
    });
    
    test('Read valid input unit L', function(done) {
      const input = '10L';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'L');
      done();
    });
    
    test('Read valid input unit lbs', function(done) {
      const input = '10lbs';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'lbs');
      done();
    });
    
    test('Read valid input unit kg', function(done) {
      const input = '10kg';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'kg');
      done();
    });
    
    test('Read valid input unit mi', function(done) {
      const input = '10mi';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'mi');
      done();
    });
    
    test('Read valid input unit km', function(done) {
      const input = '10km';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'km');
      done();
    });
    
    test('Error for invalid input unit', function(done) {
      const input = '32g';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'invalid unit');
      done();
    });
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('Return unit for gal', function(done) {
      const input = 'gal';
      const result = convertHandler.getReturnUnit(input);
      assert.equal(result, 'L');
      done();
    });
    
    test('Return unit for L', function(done) {
      const input = 'L';
      const result = convertHandler.getReturnUnit(input);
      assert.equal(result, 'gal');
      done();
    });
    
    test('Return unit for lbs', function(done) {
      const input = 'lbs';
      const result = convertHandler.getReturnUnit(input);
      assert.equal(result, 'kg');
      done();
    });
    
    test('Return unit for kg', function(done) {
      const input = 'kg';
      const result = convertHandler.getReturnUnit(input);
      assert.equal(result, 'lbs');
      done();
    });
    
    test('Return unit for mi', function(done) {
      const input = 'mi';
      const result = convertHandler.getReturnUnit(input);
      assert.equal(result, 'km');
      done();
    });
    
    test('Return unit for km', function(done) {
      const input = 'km';
      const result = convertHandler.getReturnUnit(input);
      assert.equal(result, 'mi');
      done();
    });
    
  });
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('Spell out gal', function(done) {
      const input = 'gal';
      const result = convertHandler.spellOutUnit(input);
      assert.equal(result, 'gallons');
      done();
    });
    
    test('Spell out L', function(done) {
      const input = 'L';
      const result = convertHandler.spellOutUnit(input);
      assert.equal(result, 'liters');
      done();
    });
    
    test('Spell out lbs', function(done) {
      const input = 'lbs';
      const result = convertHandler.spellOutUnit(input);
      assert.equal(result, 'pounds');
      done();
    });
    
    test('Spell out kg', function(done) {
      const input = 'kg';
      const result = convertHandler.spellOutUnit(input);
      assert.equal(result, 'kilograms');
      done();
    });
    
    test('Spell out mi', function(done) {
      const input = 'mi';
      const result = convertHandler.spellOutUnit(input);
      assert.equal(result, 'miles');
      done();
    });
    
    test('Spell out km', function(done) {
      const input = 'km';
      const result = convertHandler.spellOutUnit(input);
      assert.equal(result, 'kilometers');
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Convert gal to L', function(done) {
      const input = [5, 'gal'];
      const expected = 18.92705;
      const result = convertHandler.convert(input[0], input[1]);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
    test('Convert L to gal', function(done) {
      const input = [5, 'L'];
      const expected = 1.32086;
      const result = convertHandler.convert(input[0], input[1]);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
    test('Convert mi to km', function(done) {
      const input = [5, 'mi'];
      const expected = 8.0467;
      const result = convertHandler.convert(input[0], input[1]);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
    test('Convert km to mi', function(done) {
      const input = [5, 'km'];
      const expected = 3.10686;
      const result = convertHandler.convert(input[0], input[1]);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
    test('Convert lbs to kg', function(done) {
      const input = [5, 'lbs'];
      const expected = 2.26796;
      const result = convertHandler.convert(input[0], input[1]);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
    test('Convert kg to lbs', function(done) {
      const input = [5, 'kg'];
      const expected = 11.02312;
      const result = convertHandler.convert(input[0], input[1]);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
  });

});
