module.exports = function (sequelizeConn, Sequelize) {
    delete require.cache[require.resolve('./src/models')];
    return require("./src/models")(sequelizeConn, Sequelize);
};