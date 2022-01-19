const BookContracts = artifacts.require("BookContracts");

module.exports = function (deployer) {
  deployer.deploy(BookContracts);
};
