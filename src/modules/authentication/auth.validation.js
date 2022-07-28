const ID_REGEX = /[a-zA-Z0-9]/;
// const password_REGEX = /[a-zA-Z0-9]/;

const checkID = (ID) => {
    if (ID.match(ID_REGEX)) {
        return true;
    }
    return false;
};
module.exports = { checkID };
