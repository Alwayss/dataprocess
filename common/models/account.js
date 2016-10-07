module.exports = function(Account) {
	Account.definition.rawProperties.created.default =
		Account.definition.properties.created.default = function() {
			return new Date();
		};
	Account.definition.rawProperties.lastUpdated.default =
		Account.definition.properties.lastUpdated.default = function() {
			return new Date();
		};
	Account.definition.rawProperties.status.default =
		Account.definition.properties.status.default = function() {
			return true;
		};
};
