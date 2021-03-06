function ProgressBar() {
    Base.apply(this, arguments);
}

ProgressBar.Inherit(Base, "ProgressBar");

ProgressBar.Implement(IUIControl);
ProgressBar.Implement(ITemplateSourceImpl, new Defaults("templateName", "bindkraftstyles/control-progressbar"));
ProgressBar.$defaults = {
	templateName: "bindkraftstyles/control-progressbar"
};

ProgressBar.ImplementProperty("progressnode", new Initialize("The node with the progress itself that should changes its styling(gets bigger, wider or whatever) when a progress occurs.", null));

ProgressBar.ImplementProperty("activepropertyname", new InitializeStringParameter("Which property of the bar will change when the bar updates (width)", "width"));
ProgressBar.ImplementProperty("activepropertydimension", new InitializeStringParameter("In what dimension the property will change when the bar updates (%, em, px, etc)", "%"));

ProgressBar.ImplementActiveProperty("currentvalue", new InitializeStringParameter("The current value of the progress's property. Also note that it can be used as start value", 0), null, true, "Update");
ProgressBar.ImplementProperty("shownloaddimension", new InitializeStringParameter("Shown dimension in the end of the progress bar's loaded text.", "%"));
ProgressBar.ImplementProperty("maxvalue", new InitializeStringParameter("The maximum value of the progress's property.", 100));

ProgressBar.prototype.init = function () {
    $$(this.root).first().empty().append(this.get_template());
};

ProgressBar.prototype.Update = function(){
    //var currValueInPercentage = (this.get_currentValue() / this.get_maxValue()) * 100;
    if(this.get_currentvalue() > this.get_maxvalue()){
        this.set_currentvalue(this.get_maxvalue() + " " + this.get_shownloaddimension()); 
    }

    $$(this.get_progressnode()).first().styles(this.get_activepropertyname(), this.get_currentvalue() + this.get_activepropertydimension());
    this.$currentvalue = this.get_currentvalue() + " " + this.get_shownloaddimension(); 
}