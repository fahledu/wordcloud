const jwt = require("jsonwebtoken");

function auth(req, res, next){
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) return res.sendStatus(403);
        req.groupId = data.groupId;
        next();
    });
}

module.exports = auth;