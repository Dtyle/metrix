module.exports = async (req, res, next) => {

  try {

    console.log(req.headers);
    // const user = await User.findOne({ where: { email: authorization.email }, raw: true })

    if (req.headers.hospitalcode && req.headers.hospitalcode != "") {
      req.changeSchema(req.headers.hospitalcode);
    }

    next()
  } catch (err) {
    next(err)
  }
}
