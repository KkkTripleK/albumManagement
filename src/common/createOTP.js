function randomOTP() {
    return Math.floor(Math.random() * 50000);
}
module.exports = { randomOTP };
