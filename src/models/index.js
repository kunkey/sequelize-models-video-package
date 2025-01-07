class Database {
    constructor(Connection, Sequelize) {
        if (!Connection) throw new Error('No Connection instance passed');
        if (!Sequelize) throw new Error('No Sequelize instance passed');
        this.Connection = Connection;
        global["Sequelize"] = Sequelize;
        this.models = {}; // Nơi lưu trữ các models đã khởi tạo
    }

    // Khởi tạo tất cả các models
    init(Paths) {
        Paths.forEach((path) => {
            const model = require(path); // Import model
            if (typeof model.initModel === "function") {
                const initializedModel = model.initModel(this.Connection); // Gọi init với Connection instance
                this.models[model.name] = model; // Lưu vào đối tượng models
            } else {
                console.warn(`Model at ${path} does not have an init method.`);
            }
        });
        return this.models;
    }

    // Khai báo mối quan hệ (associations)
    associations(Paths) {
        // Gọi các tệp associations để định nghĩa quan hệ giữa các models
        Paths.forEach((path) => require(path)(this.models));
    }

    // Đồng bộ cơ sở dữ liệu
    async sync() {
        try {
            await this.Connection.sync({
                force: this.Connection.options.sync?.force || false,
                alter: this.Connection.options.sync?.after || false,
                logging: this.Connection.options.sync?.logging || false,
            });
            console.log('Database synchronized successfully!');
        } catch (error) {
            console.error('Failed to synchronize the database:', error);
        }
    }
}

// Export class Database
module.exports = function (Connection, Sequelize) {
    const AppDatabase = new Database(Connection, Sequelize);
    // Khởi tạo và khai báo models đã định nghĩa ở các file models
    AppDatabase.init([
        './app/user/user.model',
        './app/role/role_list.model',
        './app/role/role_permission.model',
        './cms/user/user.model',
        './cms/role/role_list.model',
        './cms/role/role_permission.model',
        // Thêm các models khác ở đây
    ]);
    
    AppDatabase.models.CmsUserModel.findAll({}).then((ok) => {
        console.log('All users:', ok);
    });

    AppDatabase.associations([
        './app/association',
        './cms/association'
    ]); // Khai báo quan hệ giữa các models

    return {
        Sync: AppDatabase.sync(),
        Models: AppDatabase.models
    }
};