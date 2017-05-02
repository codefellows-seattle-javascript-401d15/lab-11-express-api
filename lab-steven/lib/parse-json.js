'use strict';

const debug = require('debug')('#http:parse-json');

module.exports = function(req){
  return new Promise(function(resolve, reject){
    debug('#parse-json');

    if(req.method === 'POST' || req.method === 'PUT'){
      let body = '';

      req.on('data', function(data){
        body += data.toString();
      });

      req.on('end', function(){
        try {
          req.body = JSON.parse(body);
          resolve(req);
        } catch(err) {
          console.error(err);
          reject(err);
        }
      });

      req.on('error', function(err){
        console.error(err);
        reject(err);
      });

      return;
    }

    resolve();
  });
};
