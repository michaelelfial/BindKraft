////////////////////////// Selectors
// BEGIN Simple mostly dev-time classes

function SimpleFilterableTextBoxControl(){
	TrivialElement.apply(this, arguments);
}
SimpleFilterableTextBoxControl.Inherit(TrivialElement, "SimpleFilterableTextBoxControl");
SimpleFilterableTextBoxControl.Implement(IFilterDataSource); // emits hints
SimpleFilterableTextBoxControl.Implement(IKeyboardEventHandler); // handles raw keyboard events
SimpleFilterableTextBoxControl.Implement(IKeyboardLogicalSource);
SimpleFilterableTextBoxControl.Implement(IKeyboardHandler);
SimpleFilterableTextBoxControl.Implement(IHintedSelectorUIController);
SimpleFilterableTextBoxControl.Implement(IPartnershipInitiator);
// Up to 3 selectors are supported.
SimpleFilterableTextBoxControl.ImplementReadProperty("selector1", new InitializeParameter("You can specify a selector (IHintedSelector) control in the parameters and it will be auto-advised for partnership.",null));
SimpleFilterableTextBoxControl.ImplementReadProperty("selector2", new InitializeParameter("You can specify a selector (IHintedSelector) control in the parameters and it will be auto-advised for partnership.",null));
SimpleFilterableTextBoxControl.ImplementReadProperty("selector3", new InitializeParameter("You can specify a selector (IHintedSelector) control in the parameters and it will be auto-advised for partnership.",null));

SimpleFilterableTextBoxControl.prototype.processKeyData = function(kd) {
	this.fireKeyDataEvent(kd);
}
SimpleFilterableTextBoxControl.prototype.fireValChanged = function(e) {
	this.fireImplicitHintEvent(this.get_val());
	TrivialElement.prototype.fireValChanged.apply(this, arguments);
}
SimpleFilterableTextBoxControl.prototype.OnEnterClicked = function(e) {
	this.fireExplicitHintEvent(this.get_val());
	TrivialElement.prototype.OnEnterClicked.apply(this, arguments);
}
SimpleFilterableTextBoxControl.prototype.initiatePartnerships = function() {
	if (BaseObject.is(this.get_selector1(), "IPartnershipTarget")) {
		this.get_selector1().advisePartner(this, "IKeyboardLogicalSource", "IHintedSelectorUIController", "IFilterDataSource");
	}
	if (BaseObject.is(this.get_selector2(), "IPartnershipTarget")) {
		this.get_selector2().advisePartner(this, "IKeyboardLogicalSource", "IHintedSelectorUIController", "IFilterDataSource");
	}
	if (BaseObject.is(this.get_selector3(), "IPartnershipTarget")) {
		this.get_selector3().advisePartner(this, "IKeyboardLogicalSource", "IHintedSelectorUIController", "IFilterDataSource");
	}
}
SimpleFilterableTextBoxControl.ExtendMethod("postinit", function() {
	this.on("focus", function (e) {
		this.fireStartHintProcessingUIEvent(null);
	});
	this.on("blur",  function (e) {
		this.fireStopHintProcessingUIEvent(null);
	});
});