const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Hospital Management API', 
    description: 'CSE 341 Hospital Project API with Swagger, authentication and CRUD operations',
  },
  host: 'cse341-week3-4-jzku.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      in: 'header',       
      name: 'Authorization', 
      description: "Please enter your token in the format: Bearer <your_JWT_token>"
    }
  },
};

const outputFile = './swagger.json';
const routesEndpointsFiles = [
    './routes/auth.js',
    './routes/hospital.js'
    
];

swaggerAutogen(outputFile, routesEndpointsFiles, doc);
