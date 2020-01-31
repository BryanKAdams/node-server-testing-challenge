port = parseInt(process.env.PORT, 10) || 4000;
const server = require('./server')



server.listen(port, () => console.log('API running on port ' + port));