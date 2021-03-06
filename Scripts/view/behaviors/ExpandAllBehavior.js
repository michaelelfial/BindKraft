
// Warning!!! Needs refactoring after the latest changes


function ExpandAllBehavior(node, phase) {
    ElementBehaviorBase.apply(this, arguments);
}
ExpandAllBehavior.Inherit(ElementBehaviorBase, "ExpandAllBehavior");
ExpandAllBehavior.bindBehavior = function (node, behParams, phase) {
    if (phase == BehaviorPhaseEnum.postbind) {
        var beh = new ExpandAllBehavior(node, phase);
        JBUtil.parametrize.call(beh, node, null, behParams); // JBUtil.parametrize.call(beh, behParams);
        beh.init();
        return beh;
    }
    return null;
};
ExpandAllBehavior.ImplementProperty("expandevent", new InitializeStringParameter("The name of the event to handle. Defaults to click (just for reference)", "expandall"));
ExpandAllBehavior.ImplementProperty("collapseevent", new InitializeStringParameter("The name of the event to handle. Defaults to click (just for reference)", "collapseall"));
ExpandAllBehavior.prototype.$grouper = null;
ExpandAllBehavior.prototype.get_grouper = function () {
    return this.$grouper;
}.Description("This is supposed to be used as parameter @grouper={... binding to GrouperExpander ...}");
ExpandAllBehavior.prototype.set_grouper = function (v) {
    return this.$grouper = v;
};
ExpandAllBehavior.prototype.init = function () {
    this.on(this.get_expandevent(), this.ExpandEvent);
    this.on(this.get_collapseevent(), this.CollapseEvent);
};
ExpandAllBehavior.prototype.ExpandEvent = function (e, dc) {
    var el = $(this.$target);
    if (BaseObject.is(this.get_grouper(), "GrouperExpander")) {
        if (!this.get_grouper().get_state()) {
            e.stopPropagation();
            return;
        }
    }
    Base.eachClass(this.$target, ["Expander", "GrouperExpander"], GrouperExpander.expandIt, 0, true);
    e.stopPropagation();

};
ExpandAllBehavior.prototype.CollapseEvent = function (e, dc) {
    var el = $(this.$target);
    Base.eachClass(this.$target, ["Expander", "GrouperExpander"], GrouperExpander.collapseIt,0,true);
    e.stopPropagation();

};