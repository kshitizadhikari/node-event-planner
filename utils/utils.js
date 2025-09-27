const { EventDateType } = require("../constants/enums");
function isValidEventDateType(value) {
  return Object.values(EventDateType).includes(value.toLowerCase());
}

module.exports = {
  isValidEventDateType,
};
