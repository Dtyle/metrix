const { Op } = require("sequelize");
const sequelize = require("../config/db.config.js");

class usersRepo {
    async getByEmailId(emailId, users) {
        return users.findOne({
            where: {
                email: emailId
            }
        });
    }
     // Create new admin
     async create(admin,users) {
        return await users.create(admin);
    }
    // async getAll(query) {
    //     return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    // }

    // async getAllQueryCout(query) {
    //     return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    // }
    // async create(therapist_login) {
    //     return AdminLogin.create(therapist_login);
    // }

    // async update(id, therapist_login) {
    //     return AdminLogin.update(therapist_login, {
    //         where: { id: id },
    //     });
    // }

    // async updateOTP(id, otpCode, otpExpiresAt, otpStatus) {
    //     return AdminLogin.update(
    //         { otpCode: otpCode, otpExpiresAt: otpExpiresAt, otpStatus: otpStatus },
    //         { where: { id: id } }
    //     );
    // }

    // async updateOTPStatus(id, newStatus) {
    //     return AdminLogin.update(
    //         { otpStatus: newStatus },
    //         { where: { id: id } }
    //     );
    // }

    // async updatePassword(id, newPassword) {
    //     return AdminLogin.update(
    //         { password: newPassword },
    //         { where: { id: id } }
    //     );
    // }

    // async delete(id) {
    //     return AdminLogin.destroy({ where: { id: id } });
    // }
}

module.exports = new usersRepo();
