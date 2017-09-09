const startTime = process.hrtime();
console.log('Starting server ...')


import http from 'http';
import prettyHrtime from 'pretty-hrtime';

import requestHandler from './core/request-handler.js';





var server = http.createServer(requestHandler);
server.listen(3000);

const endTime = process.hrtime(startTime)
console.log('Server started in', prettyHrtime(endTime))
