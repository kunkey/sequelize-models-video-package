"use strict";
const dotenv = require("dotenv").config();
const Sequelize = require("sequelize");

const {
    ENV_ENVIROMENT,
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
        dialectOptions: {
            connectTimeout: 30000,
            decimalNumbers: true
        },
        pool: {
            max: 100,
            min: 1,
            acquire: 30000,
            idle: 3600000
        },
        timezone: MYSQL_TIMEZONE || "+07:00",
        logging: (str) => (MYSQL_LOG_QUERY === "true") ? console.log(str) : null,
        logQueryParameters: true,
        define: {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: true
        },
        sync: {
            force: (MYSQL_FORCE_SYNC === "true") ? true : false, // Thao tác này sẽ xóa bảng trước nếu nó đã tồn tại và tạo lại bảng
            after: (MYSQL_AFTER_SYNC === "true") ? true : false, // Thao tác này thực hiện những thay đổi cần thiết trong bảng để làm cho nó khớp với mô hình
            logging: (MYSQL_LOG_QUERY === "true") ? console.log : false
        }
    }
);

const SequelizeInit = require("./index")(Connection);

module.exports = {
    Connection,
    Sync: SequelizeInit.Sync,
    Models: SequelizeInit.Models
};