const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const { connection } = require("./db");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require('path')
const cors = require('cors')
const app = express();


const auth = require("./routes/auth");
const users = require("./routes/user");
const tasks = require("./routes/tasks");
const team = require("./routes/team");

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Proyecto Tzuzul Code",
      version: "1.0.1"
    },
    servers: [
      {
        url: "http://localhost:3000/"
      }
    ],
    components:{
      securitySchemes:{
        bearerAuth:{
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security:[
      {
        bearerAuth: []
      }
    ]
  },
   apis: [`${path.join(__dirname, "./routes/*.js")}`]
};

//para acceder a la documentacion
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)))

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: '*',
}))

auth(app);
users(app);
tasks(app);
team(app);
app.get('/', (req, res)=> {
   res.redirect('/api-docs')
})


//port
const port = process.env.PORT || 3000;

//server
app.listen(port, () => {
  console.log(`server on port`, port);
});

connection();
