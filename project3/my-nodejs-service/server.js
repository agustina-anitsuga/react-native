const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/* 
 * Map of queues 
 */

const queues = new Map();
var lastKey = null;

/* 
 * Functions 
 */
 
function initializeDemoQueue() {
    const queue1 = { 
      key: '1111',
      owner: 'Demo Store',
      customers: [ ],
      avgServiceTime: {
          informed: 15*60,
          observed: null
        }
    };
    queue1.customers.push( { name: 'Customer 1', phone: '1512345678', arrivalTime: new Date() } );
    queue1.customers.push( { name: 'Customer 2', phone: '1512345678', arrivalTime: new Date() } );
    queue1.customers.push( { name: 'Customer 3', phone: '1512345678', arrivalTime: new Date() } );
    return queue1;
}

function addQueue( queue ) {
  const found = queues.get(queue.key);
  if( !found ){
    queues.set(queue.key,queue);
    lastKey = queue.key;
  } else {
    throw `Queue ${queue.key} already exists`;
  }
}

function getQueueIDFromRequest(req){
    const url = req.url;
    const queueId = url.split('/')[2];
    return queueId;
}

function nextKey() {
    return (parseInt(lastKey,10)+1).toString();
}

/* 
 * Demo data initialization 
 */
 
const queue1 = initializeDemoQueue();
addQueue( queue1 );

/* 
 * Server 
 */

app.get('/queues', (req,res) => {
  res.send(JSON.stringify(Array.from(queues.entries())));
});

app.get('/queue/*/stats', (req, res) => {
  const queueId = getQueueIDFromRequest(req);
  const queue = queues.get(queueId);
  const stats = { 
          owner: queue.owner,
          size: queue.customers.length,
          avgServiceTime: queue.avgServiceTime
        };
  res.send(JSON.stringify(stats));
});

app.get('/queue/*', (req, res) => {
  const queueId = getQueueIDFromRequest(req);
  const queue = queues.get(queueId);
  res.send(JSON.stringify(queue));
});

app.post('/queue/*/customers/next', (req, res) => {
  const queueId = getQueueIDFromRequest(req);
  console.log(req.body);
  
  res.send('next customer');
});

app.post('/queue/*/customers', (req, res) => {
  const queueId = getQueueIDFromRequest(req);
  console.log(req.body);
  
  res.send('add customer to queue');
});

app.post('/queue', (req, res) => {
  const key = nextKey();
  const owner = req.body.owner;
  const informedAST = req.body.serviceTime;
  const queue = {
      	key: key,
        owner: owner,
      	customers: [],
      	avgServiceTime: { 
            informed: informedAST, 
            observed: null
          }
        };
  addQueue(queue);
  res.send(JSON.stringify(queue));
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
