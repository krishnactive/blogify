const {validateToken} = require("../services/authentication");

function checkForAuthenticationCookie(cookieName){
    return async(req, res, next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            // const user = await user.findById(userPayload._id); // ✅ fetch full user
            // req.user = user; // ✅ Now user has fullName, email, etc.
            req.user = userPayload;
        } catch (error) {}
        return next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
}