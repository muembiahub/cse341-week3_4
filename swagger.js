const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Hospital Management API', 
    description: 'CSE 341 Hospital Project API with Swagger, GitHub OAuth Authentication, and CRUD operations',
  },
  host: 'cse341-week3-4-jzku.onrender.com',
  schemes: ['https'], 
  
  
};

const outputFile = './swagger.json';

// All route endpoint source files combined
const routesEndpointsFiles = [
    './routes/hospital.js'
];

swaggerAutogen(outputFile, routesEndpointsFiles, doc);
