<img src="https://i.pinimg.com/originals/99/49/77/994977c48fde58ac674a2d05ba5a5efb.png" alt="Hexo logo" width="100" height="100" align="right" />

# sequelize-models-common-package

> The package package contains the common structure for many services that use sequelize mysql.


## How to use this
The components of this are completely separate packages, you just need to install and use.

## Install Package

``` bash
$ npm install sequelize-models-common-package
```

## Require Package

create a file to connect database in your code
example: <b>connect.js</b>

``` js
const dotenv = require("dotenv").config();
const Sequelize = require("sequelize");

const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_TIMEZONE,
    MYSQL_LOG_QUERY,
    MYSQL_FORCE_SYNC,
    MYSQL_AFTER_SYNC
} = process.env;

const Connection = new Sequelize(
    MYSQL_DATABASE,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    {
        host: MYSQL_HOST,
        port: parseInt(MYSQL_PORT),
        dialect: "mysql",
        dialectOptions: {},
        pool: {},
        timezone: MYSQL_TIMEZONE || "+07:00",
        logging: (str) => (MYSQL_LOG_QUERY === "true") ? console.log(str) : null,
        define: {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: true
        },
        sync: {
            force: (MYSQL_FORCE_SYNC === "true") ? true : false, // This will delete the previous table if it already exists and recreate the table
            after: (MYSQL_AFTER_SYNC === "true") ? true : false, // This makes the necessary changes in the table to make it match the model
            logging: (MYSQL_LOG_QUERY === "true") ? console.log : false // Log query parameters
        }
    }
);

const SequelizeInit = require("sequelize-models-common-package")(Connection);

module.exports = {
    Connection,
    Sync: SequelizeInit.Sync,
    Models: SequelizeInit.Models
};
```