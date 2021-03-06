

function DateTimePickerControl(){
	Base.apply(this, arguments);
}
DateTimePickerControl.Inherit ( Base, "DateTimePickerControl" );
DateTimePickerControl.Implement ( IUIControl );
DateTimePickerControl.ImplementProperty ( "templateSource", new InitializeParameter ( "template", ".DateTimePickerControl" ) );
DateTimePickerControl.ImplementProperty ( "datetoload", new InitializeParameter ( "Date to loaded if needed", new Date() ) );

DateTimePickerControl.prototype.set_value = function ( v ) {
	this.set_datetoload ( v );
};
DateTimePickerControl.prototype.get_value = function () {
	return this.get_datetoload();
};
DateTimePickerControl.prototype.$init = function(){
	// template
    var el = $(this.root),
		tml = $(this.get_templateSource()),
		self = this;
		
    el.empty();
    el.append(tml.children().clone());
    Base.prototype.$init.apply(this, arguments);
	this.$expanderpath = this.getRelatedElements ( this.expanderpath ).activeclass();	
};