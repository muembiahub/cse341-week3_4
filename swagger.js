const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE 341 Hospital  Project API Documentation',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const routesEndpointsFiles = ['./routes/patients.js']; 


swaggerAutogen(outputFile, routesEndpointsFiles, doc);
