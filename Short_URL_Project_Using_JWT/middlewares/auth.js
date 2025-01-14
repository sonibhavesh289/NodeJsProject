const { getUser } = require("../service/auth");


function restictTo(roles = []) {
    return function(req,res,next) {
        if(!req.user) return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("unauthorized");
        return next();
    }
}


function checkForAuthentication(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        return next();
    }
    // console.log(token);
    const user = getUser(token);
    req.user = user;
    return next();
}

// In case of token came as header
// async function checkForAuthentication(req, res, next) {
//     const authorizationValue = req.headers["authorization"];
//     if (!authorizationValue || !authorizationValue.startsWith("Bearer ")) {
//         return next();
//     }
//     const token = authorizationValue.split("Bearer ")[1];
//     // console.log(token);
//     const user = getUser(token);
//     req.user = user;
//     next();
// }


module.exports = {
    checkForAuthentication,
    restictTo
};