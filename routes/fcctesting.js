'use strict';

const cors = require('cors');

module.exports = function (app) {
  
  app.route('/_api/server.js')
    .get(function(req, res, next) {
      console.log('requested');
      fs.readFile(process.cwd() + '/server.js', function(err, data) {
        if(err) return next(err);
        res.send(data.toString());
      });
    });
    
  app.route('/_api/routes/api.js')
    .get(function(req, res, next) {
      console.log('requested');
      fs.readFile(process.cwd() + '/routes/api.js', function(err, data) {
        if(err) return next(err);
        res.type('txt').send(data.toString());
      });
    });
      
  app.route('/_api/controllers/convertHandler.js')
    .get(function(req, res, next) {
      console.log('requested');
      fs.readFile(process.cwd() + '/controllers/convertHandler.js', function(err, data) {
        if(err) return next(err);
        res.type('txt').send(data.toString());
      });
    });
    
  let error;
  app.get('/_api/get-tests', cors({origin: '*'}), async function(req, res, next){
    if(!error && process.env.NODE_ENV === 'test') {
      if(!tests) tests = require('../test-runner.js');
      try {
        const testFilter = Array.isArray(req.query.type) ? req.query.type : [req.query.type];
        const runner = await tests.run(testFilter);
        res.json(runner);
      } catch(err) {
        error = err;
        res.status(500).json({error: err.message});
      }
    } else {
      res.json({status: 'unavailable'});
    }
  });
  
  app.get('/_api/app-info', function(req, res) {
    let hs = Object.keys(res._headers || {})
      .filter(h => !h.match(/^access-control-\w+/));
    let hObj = {};
    hs.forEach(h => {hObj[h] = res._headers[h]});
    delete res._headers['strict-transport-security'];
    res.json({headers: hObj});
  });
  
};

const fs = require('fs');
const runner = require('../test-runner.js');
let tests;
