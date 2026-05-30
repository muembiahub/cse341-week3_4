const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve, (req, res, next) => {
    
   
    swaggerDocument.host = req.get('host');
    
    swaggerDocument.schemes = [req.protocol];

    swaggerUi.setup(swaggerDocument, {
        swaggerOptions: {
            withCredentials: true 
        }
    })(req, res, next);
});

module.exports = router;
