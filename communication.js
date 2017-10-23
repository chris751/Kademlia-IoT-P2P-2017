const request = require('request');
const main = require('./main');
const findNode = require('./findNode.js');

// sends post request to bootnode on startup
exports.sendBootNodePing = function ping(ID, port, my_ip) {
  if (port != 3500) { // boot node should request itself
    request.post(
      'http://localhost:3500/api/node/ping', {
        json: {
          remoteId: ID,
          remotePort: port,
          remoteIp: my_ip
        }
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          main.handleResponse(this.response.body);
        }
      }
    );
  }
}

exports.findNodeRandom = function(ID, port, my_ip, randomPortToCall) {
  request.post(
    `http://localhost:${randomPortToCall}/api/node/ping`, {
      json: {
        remoteId: ID,
        remotePort: port,
        remoteIp: my_ip
      }
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        main.handleResponse(this.response.body);
      }
    }
  );
}


exports.findNodeRequest = function findNodeRequest(idWeWant, port) {
  console.log('searching on ' + port);
  request.post(
    `http://localhost:${port}/findnode`, {
      json: {
        remoteId: idWeWant
      }
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        findNode.handleResponse(this.response.body);
      }
    }
  );
}

exports.requestStore = function(key, value, port) {
  console.log('sending request to node' + port);
  request.post(
    `http://localhost:${port}/storeRequestFromNode`, {
      json: {
        key: key,
        value: value
      }
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {

      }
    }
  );
}

exports.requestSearchForValue = function(keyToFind, port, callback) {
  console.log('searching on ' + port);
  request.post(
    `http://localhost:${port}/searchForValue`, {
      json: {
        keyToFind: keyToFind
      }
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
          callback(this.response.body);
        }
      }
    );
  }
