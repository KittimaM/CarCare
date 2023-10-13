const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_WORD;

const Auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret);
        req.decoded = decoded;
        // res.json(req.decoded);
        next();
      } catch (error) {
        res.json({ status: "ERROR", error});
      }
}

module.exports = {
    Auth
}