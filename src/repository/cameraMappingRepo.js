const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");


class CameraMappingRepository {
  async insertCameraMapping(sequelize, data) {
    try {
      const query = `
        INSERT INTO vision_camera_mappings 
        (camera_name, use_case_type, rtsp_url, ip_address, port, username, password, camera_path, coordinates)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        data.camera_name,
        data.use_case_type,
        data.rtsp_url,
        data.ip_address,
        data.port,
        data.username,
        data.password,
        data.camera_path,
        data.coordinates,
      ];

      const [result] = await sequelize.query(query, {
        replacements: values,
        type: sequelize.QueryTypes.INSERT,
      });

      return { insertId: result }; // Return insertId if needed
    } catch (error) {
      console.error("Error in insertCameraMapping repository:", error);
      throw error;
    }
  }
}

module.exports = new CameraMappingRepository();
