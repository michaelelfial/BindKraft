function PercentageCalculation(percentage) {
	CalcualtionBase.apply(this, arguments);
	this.$percentage = percentage;
}
PercentageCalculation.Inherit(CalcualtionBase,"PercentageCalculation");
PercentageCalculation.ImplementProperty("percentage", new InitializeNumericParameter("The percentage this calculation applies",100));
PercentageCalculation.prototype.execute = function(input) {
	if (typeof input == "number") {
		return (input * this.$percentage) / 100;
	} else if (BaseObject.is(input,"Rect")) {
		return new Rect(input.x,input.y,(input.w * this.$percentage) / 100, (input.h * this.$percentage)/100);
	} else if (BaseObject.is(input, "Point")) {
		return new Point((input.x * this.$percentage)/100, (input.y * this.$percentage)/100);
	} else if (BaseObject.is(input, "SizeLimits")) {
		var sl = new SizeLimits();
		sl.w = (input.w * this.$percentage) / 100;
		sl.h = (input.h * this.$percentage) / 100;
		if (input.get_hasminsize()) {
			sl.set_minsize(this.execute(input.get_minsize()));
		}
		if (input.get_hasmaxsize()) {
			sl.set_maxsize(this.execute(input.get_maxsize()));
		}
		return sl;		
	} else if (BaseObject.is(input, "Size")) {
		return new Size((input.w * this.$percentage)/100,(input.h * this.$percentage)/100);
	}
	return input;
}