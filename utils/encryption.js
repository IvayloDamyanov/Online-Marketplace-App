const crypto = require('crypto');

const encrypt = {
    generateSalt() {
        return crypto.randomBytes(128).toString('base64');
    },
    generateHashedPassword(salt, password) {
        const hmac = crypto.createHmac('sha1', salt);
        return hmac.update(password).digest('hex');
    },
};

module.exports = { encrypt };
