// require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const { exec } = require('child_process');
// const routes = require('./routes');
// const { swaggerUi, specs } = require('./config/swagger');

const app = express();
app.use(express.json());

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// app.use('/api', routes);

function runMigrations() {
    return new Promise((resolve, reject) => {
      exec('npx sequelize-cli db:migrate', (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro na execução das migrações: ${error.message}`);
          return reject(error);
        }
        if (stderr) {
          console.error(`Erro: ${stderr}`);
          return reject(new Error(stderr));
        }
        console.log(`Migrações executadas com sucesso:\n${stdout}`);
        resolve();
      });
    });
  }

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.authenticate().then(() => {
    console.log('Database connected');
  }).catch(err => {
    console.log('Error: ' + err);
  });
});

runMigrations()

// const {Sequelize} = require('sequelize')
// const config = require('./config/config.json')

// const env = process.env.NODE_ENV || 'development'
// const sequelizeConfig = config[env]

// const sequelize = new Sequelize(
//     sequelizeConfig.database,
//     sequelizeConfig.username,
//     sequelizeConfig.password,

//     {
//         host: sequelizeConfig.host,
//         dialect: sequelizeConfig.dialect
//     }
// )



