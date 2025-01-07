const { Model, DataTypes } = Sequelize;

class AppBalanceFluctModel extends Model {
    /*** TABLE NAME ***/
    static TABLE_NAME = "App_Balance_Fluctuations";

    static TRANSACTION_TYPE_ENUM = {
        PLUS: "plus", // cộng
        MINUS: "minus", // trừ
        BALANCE: "balance", // không giao động
    };
    static STATUS_ENUM = {
        SUCCESS: "success", // thành công
        PENDINg: "pending", // đang xử lý
        REJECT: "reject", // bị từ chối
        ERROR: "error", // bị lỗi
    };
    static TRANSACTION_ENUM = {
        INTERVENT: "intervent", // can thiệp từ cms
        DEPOSIT: "deposit", // nạp tiền vào
        WITHDRAW: "withdraw", // rút tiền ra
        TRANSFER: "transfer", // chuyển tiền 
        REFURN: "refund", // hoàn tiền
    };
    static scopes = {
        // withUserInfo() {
        //     return {
        //         include: [
        //             {
        //                 model: UserMod.UserModel,
        //                 as: "userInfo",
        //                 attributes: { exclude: ["password", "deletedAt", "code", "role", "updatedAt"] }
        //             }
        //         ]
        //     };
        // },
        // byUsername(username) {
        //     return {
        //         include: [
        //             {
        //                 model: UserMod.UserModel,
        //                 where: { username },
        //                 as: "userInfo",
        //                 attributes: { exclude: ["password", "deletedAt", "code", "role", "updatedAt"] },
        //             }
        //         ]
        //     }
        // }
    };

    static Entity = {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        uid: { type: DataTypes.BIGINT, allowNull: false }, // uid của đối tác
        action_type: { // kiểu giao dịch
            type: DataTypes.ENUM({ values: Object.values(AppBalanceFluctModel.TRANSACTION_TYPE_ENUM) }),
            allowNull: false
        },
        type: { // kiểu giao động (cộng hoặc trừ)
            type: DataTypes.ENUM({ values: Object.values(AppBalanceFluctModel.TYPE_ENUM) }),
            allowNull: false
        },
        amount: { type: DataTypes.DECIMAL(19, 2), defaultValue: 0 }, // số tiền của giao động
        before_balance: { type: DataTypes.DECIMAL(19, 2), defaultValue: 0 }, // số dư trước giao dịch
        after_balance : { type: DataTypes.DECIMAL(19, 2), defaultValue: 0 }, // số dư sau giao dịch
        note: { // ghi chú thêm
            type: DataTypes.TEXT("long"),
            allowNull: false,
        },
        status: { // kiểu giao dịch
            type: DataTypes.ENUM({ values: Object.values(AppBalanceFluctModel.STATUS_ENUM) }),
            allowNull: false
        },
        createdAt: { type: DataTypes.DATE },
        updatedAt: { type: DataTypes.DATE },
        deletedAt: { type: DataTypes.DATE },
    };

    static initModel = (sequelize) => {
        return AppBalanceFluctModel.init(AppBalanceFluctModel.Entity, {
            paranoid: true,
            tableName: AppBalanceFluctModel.TABLE_NAME,
            updatedAt: "updatedAt",
            createdAt: "createdAt",
            deletedAt: "deletedAt",
            scopes: AppBalanceFluctModel.scopes,
            sequelize,
        });
    }
}

module.exports = AppBalanceFluctModel;