function BucketSelectorOrderableControl() {
    BucketSelectorControl.apply(this, arguments);
    this.set_orderable(true);
}
BucketSelectorOrderableControl.Inherit(BucketSelectorControl, "BucketSelectorOrderableControl");
BucketSelectorOrderableControl.Implement(ITemplateSourceImpl, new Defaults("templateName", "bindkraft/control-bucketselector-ordered"));
BucketSelectorOrderableControl.$defaults = {
    templateName: "bindkraft/control-bucketselector-ordered"
};
