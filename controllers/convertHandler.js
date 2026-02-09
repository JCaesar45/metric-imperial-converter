function ConvertHandler() {
  
  this.getNum = function(input) {
    // Extract the numeric part from input
    const numRegex = /^[\d./]+/;
    const match = input.match(numRegex);
    
    if (!match) {
      // No number provided, default to 1
      return 1;
    }
    
    const numStr = match[0];
    
    // Check for double-fraction (multiple slashes)
    const slashCount = (numStr.match(/\//g) || []).length;
    if (slashCount > 1) {
      return 'invalid number';
    }
    
    // Handle fraction
    if (slashCount === 1) {
      const [numerator, denominator] = numStr.split('/');
      const result = parseFloat(numerator) / parseFloat(denominator);
      if (isNaN(result) || !isFinite(result)) {
        return 'invalid number';
      }
      return result;
    }
    
    // Handle whole number or decimal
    const result = parseFloat(numStr);
    if (isNaN(result)) {
      return 'invalid number';
    }
    return result;
  };
  
  this.getUnit = function(input) {
    // Extract the unit part (everything after the number)
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
    
    if (!match) {
      return 'invalid unit';
    }
    
    const unit = match[0].toLowerCase();
    const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    
    // Check for valid unit (case insensitive)
    if (validUnits.includes(unit)) {
      return unit === 'l' ? 'L' : unit;
    }
    
    return 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };
    return unitMap[initUnit];
  };
  
  this.spellOutUnit = function(unit) {
    const spellMap = {
      'gal': 'gallons',
      'L': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };
    return spellMap[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;
    
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return 'invalid unit';
    }
    
    // Round to 5 decimal places
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitFull = this.spellOutUnit(initUnit);
    const returnUnitFull = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitFull} converts to ${returnNum} ${returnUnitFull}`;
  };
  
}

module.exports = ConvertHandler;
