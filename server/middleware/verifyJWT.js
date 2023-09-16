const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.verifyJWT = (req, res, next) => {
    console.log('\nVerifica jwt...')
    const authHeader = req.headers[`authorization`];

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    //_id: foundUser._id, UserName: foundUser.UserName, Email: foundUser.Email

    jwt.verify(
        token,
        process.env.ACCESS_SECRET_TOKEN,
        (err, decoded) => {
            if (err) {
                console.log(`Diritti di accesso insufficienti: `, err.message);
                return res.status(403).json({ message: `Diritti di accesso insufficienti, ${err.message}` });
            }

            console.log('\nAccesso autorizzato ;-)\n');
            req.user = { _id: decoded._id, UserName: decoded.UserName, Email: decoded.Email };
            console.log('_id: ', req.user._id, ' UserName: ', req.user.UserName, ' Email: ', decoded.Email);

            next();
        }
    );
}