////////////// DelegateValidatorRule //////////////////////////////
function DelegateValidatorRule(v) {
	ValidateValue.apply(this, arguments);
	this.$validator = v;
	this.$order = 10000;
};

DelegateValidatorRule.Inherit(ValidateValue, "DelegateValidatorRule");
DelegateValidatorRule.registerValidator("sync");
DelegateValidatorRule.prototype.$validator = null;
DelegateValidatorRule.prototype.get_delegate = function () { return null; };
DelegateValidatorRule.prototype.get_param1 = function () { return null; };
DelegateValidatorRule.prototype.get_param2 = function () { return null; };
DelegateValidatorRule.prototype.get_param3 = function () { return null; };
DelegateValidatorRule.prototype.get_message = function (lastValue) {
	var msg = this.get_text();
	if (msg != null && msg.length > 0) msg = msg.sprintf(lastValue);
	return msg;
};

DelegateValidatorRule.prototype.validateValue = function (validator, value, binding) {
	var result = ValidationResultEnum.correct;
	var d = this.get_delegate();
	if (d != null && !IsNull(value)) {
		return d.invoke({ rule: this, validator: validator, value: value, binding: binding });
	}
	return this.validationResult(result);
};
var DelegateValidatorControl = DelegateValidatorRule;