


/*CLASS*/
function RibbonCommand() {
    Base.apply(this, arguments);
    this.on("click", this.onClick);
}
RibbonCommand.Inherit(Base, "RibbonCommand");
RibbonCommand.Implement(IDisablable);
RibbonCommand.prototype.set_disabled = function (v) {
    var el = $(this.root);
    if (v) {
        el.attr("disabled", true);
        el.css("opacity", "0.5");
        if (!el.is("input")) {
            el.css({ 'cursor': 'default', 'color': '#C0C0C0' });
        }
    } else {
        el.removeAttr("disabled");
        el.css("opacity", "1.0");
        if (!el.is("input")) {
            el.css({ 'cursor': 'pointer', 'color': '#FFFFFF' });
        }
    }
    this.$disabledUI = v;
};
RibbonCommand.prototype.clickevent = new InitializeEvent("Command handlers go here");
RibbonCommand.prototype.onClick = function (ev) {
    if (!this.get_disabled()) this.clickevent.invoke(this, this.get_data());
};