const cameraRepo = require("../../repository/cameraMappingRepo");

exports.createCameraMapping = async (req, res) => {
  try {
    const {
      camera_name,
      use_case_type,
      rtsp_url,
      ip_address,
      port,
      username,
      password,
      camera_path,
      coordinates,
    } = req.body;

    if (!camera_name || !use_case_type  || !ip_address) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields: camera_name, use_case_type, rtsp_url, ip_address",
      });
    }

    // Convert coordinates array to JSON string
    const coordinatesString = JSON.stringify(coordinates);

    const result = await cameraRepo.insertCameraMapping(req.sequelize, {
      camera_name,
      use_case_type,
      rtsp_url,
      ip_address,
      port,
      username,
      password,
      camera_path,
      coordinates: coordinatesString, // pass as string
    });

    return res.status(201).json({
      status: true,
      message: "Camera mapping inserted successfully.",
      insertId: result.insertId,
    });

  } catch (error) {
    console.error("Error in createCameraMapping controller:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
