const swaggerAutogen = require('swagger-autogen');



const doc = {
    info: {
        title: 'My API',
        description: 'description'
    },
    host: 'localhost:8000'
}


const outputFile = './swagger.json';
const routes = ['./routes/blogRouter.js', './routes/userRouter.js']

swaggerAutogen(outputFile, routes, doc)