
// DEPRECATED - here mostly for compatibility


// Selectable repeater
/*
Should work only with arrays
*/
function LookupRepeater() {
    Repeater.apply(this, arguments);

    this.$filterparameter = {};
    this.$selectorparameter = {};

    this.findItem = null;
    this.on("keyup", this.onKeyPress);
    this.on("keydown", this.onSwallow);
    this.on("keypress", this.onSwallow);

    // var el = $(this.root);
    // var localThis = this;
    // el.keydown(function (evnt) { localThis.onKeyPress(evnt, null); });

    this.$bodyVisible = true;
    this.$headerVisible = true;
    this.$filterparameter = {};
    this.$selectorparameter = {};
}
LookupRepeater.Inherit(Repeater, "LookupRepeater");
LookupRepeater.Implement(IDisablable);
LookupRepeater.prototype.set_disabled = function (v) {
    IDisablable.prototype.set_disabled.apply(this, arguments);
    if (this.enabledCss != null && this.enabledCss.length > 0) {
        if (v) {
            $(this.root).removeClass(this.enabledCss);
        } else {
            $(this.root).addClass(this.enabledCss);
        }
    }
    if (this.disabledCss != null && this.disabledCss.length > 0) {
        if (v) {
            $(this.root).addClass(this.disabledCss);
        } else {
            $(this.root).removeClass(this.disabledCss);
        }
    }
};
// events
LookupRepeater.prototype.selchangedevent = new InitializeEvent("Fires when the selection is changed");
LookupRepeater.prototype.internalselchangedevent = new InitializeEvent("Fires when the selection is changed even when this is a result of setting a property. For use only inside the repeater's template. An outside binding can potentially cause a dead lock, please use selchangedevent for any form-wide actions.");
LookupRepeater.prototype.activatedevent = new InitializeEvent("Fires when an item is activated (clicked, enter is pressed etc.)");
LookupRepeater.prototype.openevent = new InitializeEvent("Fires when an item is opened in dropdown (clicked, enter is pressed etc.)");
LookupRepeater.prototype.closeevent = new InitializeEvent("Fires when an item is closed in dropdown (clicked, enter is pressed etc.)");
LookupRepeater.prototype.escapeevent = new InitializeEvent("Fires when the user wants to close/abandon the ui - when esc key is clicked for example.");
LookupRepeater.prototype.keyevent = new InitializeEvent("Fires when the user wants presses non-control keys over the control.");
LookupRepeater.prototype.$tabindex = -1;
LookupRepeater.prototype.get_tabindex = function () {
    return this.$tabindex;
};
LookupRepeater.prototype.set_tabindex = function (v) {
    this.$tabindex = v;
    var f = null;
    jbTrace.log("set tabindex=" + v);
    if (this.$headerElement != null && this.$headerElement.length > 0) {
        f = this.$headerElement.find('[data-purpose="focus"]');
    }
    if (f != null && f.length > 0) f.prop("tabindex", this.$tabindex);

};
// Parameters
LookupRepeater.prototype.disabledCss = new InitializeStringParameter("Optional CSS class to assign to the root element when the repeater is disabled.",null);
LookupRepeater.prototype.enabledCss = new InitializeStringParameter("Optional CSS class to assign to the root element when the repeater is enabled.", null);
LookupRepeater.prototype.$headerElement = null;
LookupRepeater.prototype.$inactiveHeaderElement = null;
LookupRepeater.prototype.$itemContainer = null;
LookupRepeater.prototype.$bodyPanel = null;
LookupRepeater.prototype.$init = function (bInitialCall) {
    var el = $(this.root);
    if (this.get_itemTemplate() == null) {
        // No template is known to exist
        var it = this.child("itemtemplate");
        this.$itemContainer = null;
        if (it != null && it.length > 0) {
            this.set_itemTemplate(it.children().clone().get(0));
            it.empty();
            this.$itemContainer = it;
            this.$headerElement = this.child("headerelement");
            this.$inactiveHeaderElement = this.child("inactiveheaderfelement");
            var t = this.child("bodypanel");
            if (t != null && t.length > 0) {
                this.$bodyPanel = t;
            } else {
                this.$bodyPanel = this.$itemContainer;
            }
        } else {
            // if not specified - use the entire body of the repeater as item template
            this.set_itemTemplate(el.children().clone().get(0));
            el.empty();
            this.$itemContainer = el;

            this.$headerElement = $();
            this.$bodyPanel = $();
            this.$inactiveHeaderElement = $();
        }
        if (this.builtinFilter != null) {
            this.itemfilter = this.$defaultItemFilter;
            this.itemselector = this.$defaultItemSelector;
        }
        ViewBase.$intenal_initialize($(this.root).children(), bInitialCall, true);
        this.init();
        this.initializedevent.invoke(this,null);
        this.rebind(); // Default behaviour, items controls should override this
        this.set_bodyVisible(this.$bodyVisible);
        this.set_headerVisible(this.$headerVisible);
        this.set_disabled(this.get_disabled());

        if (this.$headerElement != null && this.$headerElement.length > 0) {
            f = this.$headerElement.find('[data-purpose="focus"]');
        }
        if (f != null && f.length > 0) f.prop("tabindex", this.$tabindex); 
    }
};
LookupRepeater.prototype.$init_old = function (bInitialCall) {
    // In the repeater we need to cut the innerHTML and keep it as a template for repeating items
    var el = $(this.root);
    if (this.get_itemTemplate() == null) {
        var it = this.child("itemtemplate");
        if (it != null && it.length > 0) {
            this.set_itemTemplate(it.children().clone().get(0));
            it.empty();
            this.$itemContainer = it;
            this.$headerElement = this.child("headertemplate");
            this.$inactiveHeaderElement = this.child("inactiveheadertemplate");
        } else {
            this.set_itemTemplate(el.children().clone().get(0));
            el.empty();
            this.$itemContainer = el;
            this.$headerElement = $();
        }
    }
    if (this.$itemContainer == null) this.$itemContainer = el;
    var t = this.child("bodypanel");
    if (t != null && t.length > 0) {
        this.$bodyPanel = t;
    } else {
        this.$bodyPanel = this.$itemContainer;
    }
    if (this.$headerElement == null) this.$headerElement = $();
    if (this.$inactiveHeaderElement == null) this.$inactiveHeaderElement = $();
    if (this.builtinFilter != null) {
        this.itemfilter = this.$defaultItemFilter;
        this.itemselector = this.$defaultItemSelector;
    }
    ViewBase.$intenal_initialize($(this.root).children(), bInitialCall, true);
    this.init();
    this.initializedevent.invoke(this,null);
    this.rebind(); // Default behaviour, items controls should override this
    this.set_bodyVisible(this.$bodyVisible);
    this.set_headerVisible(this.$headerVisible);
};

LookupRepeater.prototype.get_bodyVisible = function () { return this.$bodyVisible; };
LookupRepeater.prototype.set_bodyVisible = function (v) {
    if (this.get_disabled()) {
        this.$bodyVisible = false;
    } else {
        this.$bodyVisible = v;
    }
    if (this.$bodyPanel != null) {
        if (this.$bodyVisible) {
            if (this.get_disabled()) {
                this.$bodyPanel.hide();
            } else {
                this.$bodyPanel.show();
				JBUtil.adjustPopupInHost(this, this.$bodyPanel, 0, -30);
            }
        } else {
            this.$bodyPanel.hide();
        }
        // this.updateTargets();
    }
};
LookupRepeater.prototype.$updatePartTargets = function () {
    var bUpdateAll = false;
    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; i++) {
            var partElement = $(arguments[i]);
            if (partElement.length > 0 && partElement.activeclass() == null) {
                bUpdateAll = true;
                break;
            }
        }
    } else {
        bUpdateAll = true;
    }
    if (bUpdateAll) {
        this.updateTargets();
    } else {
        for (var i = 0; i < arguments.length; i++) {
            var partElement = $(arguments[i]);
            if (partElement.length > 0 && partElement.activeclass() != null) {
                var act = partElement.activeclass();
                act.$resetUpdateTransaction();
                act.updateTargets();
                act.$resetUpdateTransaction();
            }
        }
    }
};
LookupRepeater.prototype.$updatePartSources = function () {
    var bUpdateAll = false;
    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; i++) {
            var partElement = $(arguments[i]);
            if (partElement.length > 0 && partElement.activeclass() == null) {
                bUpdateAll = true;
                break;
            }
        }
    } else {
        bUpdateAll = true;
    }
    if (bUpdateAll) {
        this.updateSources();
    } else {
        for (var i = 0; i < arguments.length; i++) {
            var partElement = $(arguments[i]);
            if (partElement.length > 0 && partElement.activeclass() != null) {
                var act = partElement.activeclass();
                act.$resetUpdateTransaction();
                act.updateSources();
                act.$resetUpdateTransaction();
            }
        }
    }
};
LookupRepeater.prototype.get_headerVisible = function () { return this.$headerVisible; };
LookupRepeater.prototype.set_headerVisible = function (v) {
    this.$headerVisible = v;
    if (this.$headerElement != null && this.$headerElement.length > 0) {
        // There is a header element defined
        if (this.$headerVisible) {
            this.$headerElement.show();
        } else {
            this.$headerElement.hide();
        }
        if (this.$inactiveHeaderElement != null && this.$inactiveHeaderElement.length > 0) {
            // There is an inactive header which will be shown when the main header is hidden
            if (this.$headerVisible) {
                this.$inactiveHeaderElement.hide();
            } else {
                this.$inactiveHeaderElement.show();
            }
        }
        this.$updatePartTargets(this.$headerElement, this.$inactiveHeaderElement);
    }
};
LookupRepeater.prototype.showBody = function () { this.set_bodyVisible(true); };
LookupRepeater.prototype.hideBody = function () { this.set_bodyVisible(false); };
LookupRepeater.prototype.showHeader = function () { this.set_headerVisible(true); };
LookupRepeater.prototype.hideHeader = function () { this.set_headerVisible(false); };
LookupRepeater.prototype.identification = null; // identification cues for the items. The internal impl uses this as name of the id property
LookupRepeater.prototype.selectedCssClass = null;
LookupRepeater.prototype.$selectedIndex = -1;
LookupRepeater.prototype.$previousSelectedIndex = -1;
LookupRepeater.prototype.get_selectedindex = function () { return this.$selectedIndex; };
LookupRepeater.prototype.set_selectedindex = function (v, bDontRaiseEvent) {
    var itms = this.get_items();
    var itmsCount = (itms != null) ? itms.length : 0;
    this.$prevSelectedIndex = this.$selectedIndex;
    if (this.$prevSelectedIndex == null || this.$prevSelectedIndex < 0 || this.$prevSelectedIndex >= itmsCount) this.$prevSelectedIndex = -1;
    this.$selectedIndex = v;
    if (this.$selectedIndex == null || this.$selectedIndex < 0) {
        this.$selectedIndex = -1;
    } else if (this.$selectedIndex >= itmsCount) {
        this.$selectedIndex = 0;
    }
    if (!bDontRaiseEvent) this.$fireSelChangedEvent();
    this.$fireInternalSelChangedEvent();
    this.$applySelection();
};
LookupRepeater.prototype.get_selecteditem = function () {
    var itms = this.get_items();
    var itmsCount = (itms != null) ? itms.length : 0;
    var curSelIndex = this.get_selectedindex();
    if (curSelIndex != null && curSelIndex >= 0 && curSelIndex < itmsCount) {
        return itms[curSelIndex];
    }
    return null;
};
LookupRepeater.prototype.set_selecteditem = function (v) {
    var itms = this.get_items();
    var itmsCount = (itms != null) ? itms.length : 0;
    if (itmsCount > 0) {
        this.set_selectedindex(this.$findItemIndex(v));
    }
};
LookupRepeater.prototype.$fireInternalSelChangedEvent = function () {
    var curSelIndex = this.get_selectedindex();
    
        var dc = this.get_items();
        if (dc != null && curSelIndex >= 0 && curSelIndex < dc.length) {
            this.internalselchangedevent.invoke(this, dc[curSelIndex]);
        } else {
            this.internalselchangedevent.invoke(this, null);
        }
    
};
LookupRepeater.prototype.$fireSelChangedEvent = function () {
    var curSelIndex = this.get_selectedindex();
    if (curSelIndex != this.$prevSelectedIndex) {
        var dc = this.get_items();
        if (dc != null && curSelIndex >= 0 && curSelIndex < dc.length) {
            this.selchangedevent.invoke(this, dc[curSelIndex]);
        } else {
            this.selchangedevent.invoke(this, null);
        }
    }
};
LookupRepeater.prototype.set_value = function (v) {
    var n = this.$findItem(v);
    this.set_selectedindex(n,true);
};
LookupRepeater.prototype.get_value = function () {
    var itms = this.get_items();
    var curSelIndex = this.get_selectedindex();
    if (itms != null && itms.length > 0 && curSelIndex >= 0 && curSelIndex < itms.length) {
        var itm = itms[curSelIndex];
        if (this.identification != null && this.identification.length > 0) {
            return itm[this.identification];
        } else {
            return itm;
        }
    }
    return null;
};
// State changers
LookupRepeater.prototype.goActive = function (e, dc) {
    if (this.get_disabled()) return;
    if (this.get_bodyVisible()) return;
    if (this.$inactiveHeaderElement != null && this.$inactiveHeaderElement.length > 0 && this.$headerElement != null && this.$headerElement.length > 0) {
        this.set_headerVisible(true);
        var f = this.$headerElement.find('[data-purpose="focus"]');
        if (f != null && f.length > 0) {
            f.focus();
        }
    }
    this.openevent.invoke(this, null);
    this.set_bodyVisible(true);
    this.$updatePartTargets(this.$headerElement, this.$inactiveHeaderElement);
};
LookupRepeater.prototype.goInactive = function (e, dc) {
    if (!this.get_bodyVisible()) return;
    if (this.$inactiveHeaderElement != null && this.$inactiveHeaderElement.length > 0 && this.$headerElement != null && this.$headerElement.length > 0) {
        this.set_headerVisible(false);

    } 
    this.closeevent.invoke(this, null);
    this.set_bodyVisible(false);
    this.$updatePartTargets(this.$headerElement, this.$inactiveHeaderElement);
};
LookupRepeater.prototype.toggleActive = function (e, dc) {
    if (this.get_bodyVisible()) {
        this.goInactive();
    } else {
        this.goActive();
    }
};
LookupRepeater.ImplementProperty("pendingtimeout", new InitializeNumericParameter("Timeout for pending operations in milliseconds. Default is 50.",50));
LookupRepeater.prototype.$pendingOperation = null;
LookupRepeater.prototype.$pendingOperationHandler = function () {
    jbTrace.log(this.$pendingOperation);
    this.$pendingOperationHandlerWrapper = null;
    var op = this.$pendingOperation;
    this.$pendingOperation = null;
    if (op != null) {
        switch (op) {
            case "open":
                this.goActive();
                break;
            case "close":
            case "forceclose":
                this.goInactive();
                break;
        }
    }
};
LookupRepeater.prototype.$pendingOperationHandlerWrapper = null;
LookupRepeater.prototype.$schedulePending = function (op, force) {
    if (op != null) {
        if (op == "open" && this.$pendingOperation != "forceclose") {
            this.$pendingOperation = "open";
        } else if (op == "close" && this.$pendingOperation != "open") {
            this.$pendingOperation = op;
        } else if (op == "close" && force) {
            this.$pendingOperation = "forceclose";
        }
    }
    if (this.$pendingOperationHandlerWrapper == null) {
        this.$pendingOperationHandlerWrapper = Delegate.createWrapper(this, this.$pendingOperationHandler);
        window.setTimeout(this.$pendingOperationHandlerWrapper, this.get_pendingtimeout());
    }
};
LookupRepeater.prototype.Open = function () {
    this.$schedulePending("open");
    // jbTrace.log("open");
};
LookupRepeater.prototype.Close = function () {
    this.$schedulePending("close");
    // jbTrace.log("close");
};
LookupRepeater.prototype.ForceClose = function () {
    this.$schedulePending("close", true);
    // jbTrace.log("close");
};
LookupRepeater.prototype.Toggle = function () {
    if (this.get_bodyVisible()) {
        this.$schedulePending("close");
    } else {
        this.$schedulePending("open");
    }
    // jbTrace.log("toggle");
};
LookupRepeater.prototype.FocusHeader = function (e, dc) {
    if (this.$headerElement != null) {
        var f = this.$headerElement.find('[data-purpose="focus"]');
        if (f != null && f.length > 0) {
            f.focus();
        }
    }
};
// End State changers
LookupRepeater.prototype.onKeyPress = function (evnt) {
    if (evnt.which == 38 || evnt.which == 37) {
        if (!this.get_disabled()) this.moveSelection(-1);
        evnt.stopPropagation();
    } else if (evnt.which == 40 || evnt.which == 39) {
        if (!this.get_disabled()) this.moveSelection(1);
        evnt.stopPropagation();
    } else if (evnt.which == 13) {
        var dc = this.get_items();
        var curSelIndex = this.get_selectedindex();
        if (dc != null && curSelIndex >= 0 && curSelIndex < dc.length && !this.get_disabled()) this.activatedevent.invoke(this, dc[curSelIndex]);
		if (this.get_bodyVisible()) evnt.stopPropagation();
    } else if (evnt.which == 27) {
        this.escapeevent.invoke(this, null);
        evnt.stopPropagation();
    } else if (evnt.which == 46) {
        this.set_selectedindex(-1);
        this.applySelection();
        evnt.stopPropagation();
        this.activatedevent.invoke(this, null);
    } else if (evnt.which == 9) {
        // skip this one
    } else {
        if (!this.get_disabled()) {
            var dc = this.get_items();
            var curSelIndex = this.get_selectedindex();
            if (dc != null && curSelIndex >= 0 && curSelIndex < dc.length) {
                this.keyevent.invoke(this, dc[curSelIndex]);
            } else {
                this.keyevent.invoke(this, null);
            }
        }
    }
    // jbTrace.log("onKeyPress event: " + evnt.which);

};
LookupRepeater.$ignoreKeys = [9,27];
LookupRepeater.prototype.onSwallow = function (e) {
    jbTrace.log("onSwallow event: " + e.which);
    var count = LookupRepeater.$ignoreKeys.Aggregate(function (idx, item, result) {
        var rs = (result == null) ? 0 : result;
        if (item == e.which) return rs + 1;
        return rs;
    });
    if (count > 0) return;
    e.stopPropagation();
    e.preventDefault();
    /*
    if (this.eventObject.preventDefault) {
    this.eventObject.preventDefault();
    } else {
    this.eventObject.returnValue = false;
    }
    */

};
LookupRepeater.prototype.onItemClick = function (evnt, dc) {
    if (dc != null && !this.get_disabled()) {
        var n = this.$findItemIndex(dc);
        if (n >= 0) {
            this.set_selectedindex(n);
            this.activatedevent.invoke(this, dc);
            evnt.stopPropagation();
        }
    }
};
LookupRepeater.prototype.moveSelection = function (v) {
    var itms = this.get_items();
    var curSelIndex = this.get_selectedindex();
    if (curSelIndex == null) this.set_selectedindex(-1);
    if (itms.length <= 0) {
        this.set_selectedindex(-1);
    } else {
        if (this.get_selectedindex() < 0) {
            this.set_selectedindex(this.get_firstItemIndex());
        } else {
            var newIdx = curSelIndex + v;
            if (newIdx < this.get_firstItemIndex()) {
                this.set_selectedindex(this.get_lastItemIndex());
            } else if (newIdx > this.get_lastItemIndex()) {
                this.set_selectedindex(this.get_firstItemIndex());
            } else {
                this.set_selectedindex(newIdx);
            }
        }
    }
    this.$applySelection();
};
LookupRepeater.prototype.$findItemIndex = function(idObj) { // by item
    if (this.identification != null && this.identification.length > 0) {
        return this.$findItem(idObj[this.identification]);
    } else {
        return this.$findItem(idObj);
    }
};
LookupRepeater.prototype.$findItem = function (idData) { // By value
    var itms = this.get_items();
    if (itms != null) {
        if (this.finditem == null) {
            var i;
            if (this.identification != null && this.identification.length > 0) {
                for (i = 0; i < itms.length; i++) {
                    if (itms[i][this.identification] == idData) return i;
                }
            } else {
                for (i = 0; i < itms.length; i++) {
                    if (itms[i] == idData) return i;
                }
            }
            return -1;
        } else {
            if (BaseObject.is(this.finditem, "Delegate")) {
                return this.finditem.invoke(idData, this.get_tiems());
            } else {
                return this.finditem.call(idData, this.get_tiems());
            }
        }
    } else {
        return -1;
    }
};
LookupRepeater.prototype.finditem = null; // custom callback to find item by data proto: function (idData,items): int; returns the index of the element
// Indexed parameters for passing to the filter and selector callbacks
LookupRepeater.ImplementIndexedProperty("filterparameter", new InitializeObject("Parameters for the filter callback"));
LookupRepeater.ImplementIndexedProperty("selectorparameter", new InitializeObject("Parameters for the selector callback"));
// Item filter
LookupRepeater.prototype.builtinFilter = new InitializeBooleanParameter("Pass #builtinFilter='1' as parameter to enable the built in filter and selector", false);
LookupRepeater.prototype.itemfilter = new Initialize("Callback function or delegate to perform filtering of the items. Return the resulting items[]. Proto function(sender, all_items): object[].");
LookupRepeater.prototype.itemselector = new Initialize("Callback function or delegate to perform selection of the currently listed items over some typed characters and other parameters. Return -1 for no suggestion or the item index otherwise. proto: function(sender, items[]):int."); ;
LookupRepeater.prototype.$defaultItemFilter = function (sender, items) {
    if (BaseObject.is(items, "Array")) {
        var This = this;
        return items.Select(function (idx, item) {
            var fv, v;
            if (This.$filterparameter != null) {
                for (var f in This.$filterparameter) {
                    if (f == Binding.entityStatePropertyName) continue;
                    v = item[f];
                    fv = This.$filterparameter[f];
                    if (v != null && typeof v == "string" && v.length > 0) {
                        if (typeof fv == "string" && fv.length > 0) {
                            if (v.indexOf(fv) < 0) return null;
                        }
                    }
                }
                return item;
            }
        });
    }
};
LookupRepeater.prototype.$defaultItemSelector = function (sender, items) {
    if (BaseObject.is(items, "Array")) {
        var This = this;
        for (var i = 0; i < items.length; i++) {
            var v, vs = null, b = true;
            for (var s in This.$selectorparameter) {
                if (s == Binding.entityStatePropertyName) continue;
                vs = This.$selectorparameter[s];
                v = items[i][s];
                if (vs != null && vs.length > 0 && v != null && v.length > 0) {
                    if (v.indexOf(vs) < 0) {
                        b = false;
                        break;
                    }
                }
            }
            if (b) return i;
        }
    }
    return -1;
};
// Public event handler - refilters the items and reselects them
LookupRepeater.prototype.Refilter = function (e, dc, b, bp) {
    if (e.type == "keyup" || e.type == "keydown" || e.type == "keypress" || bp == "keynav") {
        if (e.which == 13 || (e.which >= 37 && e.which <= 40)) {
            return;
        }
    }
    var selval = this.get_value();
    this.$updatePartSources(this.$headerElement, this.$inactiveHeaderElement); // this.updateHeaderSources();
    this.$applyFilter();
    this.$createChildren();
    this.rebind();
    this.updateTargets();
    this.itemschangedevent.invoke(this, this.$items);
    this.get_value(selval);
};
// Public event handler - calls the selector to suggest a selection, but does not refilter the items
LookupRepeater.prototype.Reselect = function (e, dc) {
    this.$updatePartSources(this.$headerElement, this.$inactiveHeaderElement);
    var si = this.get_suggestedselection();
    if (si >= 0) {
        this.set_selectedindex(si);
    }
};
LookupRepeater.prototype.UpdateHeaders = function (e) {
    this.$updatePartSources(this.$headerElement, this.$inactiveHeaderElement);
    this.$updatePartTargets(this.$headerElement, this.$inactiveHeaderElement);
    if (e != null && e.stopPropagation) e.stopPropagation();
};
LookupRepeater.prototype.set_items = function (v) { // override to disallow objects and allow only arrays
    if (v == null || BaseObject.is(v, "Array")) {
        // if (this.get_items() != null) {  } // What was that for ??? I shoul remember
        this.$filtereditems = null;
        Repeater.prototype.set_items.call(this, v);
        //        var localThis = this;
        //        this.$itemContainer.children().click(function (evnt) {
        //            localThis.onItemClick(evnt, null);
        //        });
        return;
    }
    throw "LookupRepeater: only arrays (lists) can be bound to the $items property";
};
LookupRepeater.prototype.$filtereditems = null;
LookupRepeater.prototype.get_items = function () {
    if (this.$filtereditems == null) this.$applyFilter(); 
    return this.$filtereditems;
};
LookupRepeater.prototype.$applyFilter = function () {
    var items = Repeater.prototype.get_items.call(this, null);
    if (this.itemfilter != null) {
        if (BaseObject.is(this.itemfilter, "Delegate")) {
            items = this.itemfilter.invoke(this, items);
        } else {
            items = this.itemfilter.call(this, this, items);
        }
    }
    this.$filtereditems = items;
};
LookupRepeater.prototype.get_suggestedselection = function () {
    if (this.$filtereditems == null) this.$applyFilter();
    var sindex = -1, items = this.$filtereditems;
    if (this.itemselector != null) {
        if (BaseObject.is(this.itemselector, "Delegate")) {
            sindex = this.itemselector.invoke(this, items);
        } else {
            sindex = this.itemselector.call(this, this, items);
        }
    }
    return (sindex >= 0) ? sindex : this.get_selectedindex();
};
LookupRepeater.prototype.$scrollItemIntoView2 = function (element) {
    var container = this.$itemContainer;
    if (container != null && container.length > 0) {
        var containerTop = $(container).scrollTop();
        var containerBottom = containerTop + $(container).height();
        var elemTop = element.offset().top;
        var elemBottom = elemTop + $(element).height();
        if (elemTop < containerTop) {
            $(container).scrollTop(elemTop);
        } else if (elemBottom > containerBottom) {
            $(container).scrollTop(elemBottom - $(container).height());
        }
    }
};
LookupRepeater.prototype.$scrollItemIntoView = function (element) {
    var container = this.$itemContainer;
    if (container != null && container.length > 0 && element.length > 0) {
        var containerTop = $(container).scrollTop();
        var containerBottom = containerTop + $(container).height();
        var elemTop = element.get(0).offsetTop;
        var elemBottom = elemTop + element.height(); 
        // jbTrace.log("Scroll into view. elemTop=" + elemTop + ", elemBottom=" + elemBottom + ", containerTop=" + containerTop + ", containerBottom=" + containerBottom + ", container height=" + $(container).height());
        if (elemTop < containerTop) {
            $(container).scrollTop(elemTop);
        } else if (elemBottom > containerBottom) {
            $(container).scrollTop(elemBottom - $(container).height());
        }
    }
};
LookupRepeater.prototype.$applySelection = function () {
    if (this.$itemContainer == null || this.$itemContainer.length == 0) return;
    if (this.applySelection(this.$selectedIndex, this.$prevSelectedIndex, this.$itemContainer, this.$headerElement) === true) {
        return; // if the overriding method in the child class does this we exit
    }
    if (this.selectedCssClass != null && this.selectedCssClass.length > 0) {
        var c = this.$itemContainer.children();
        c.removeClass(this.selectedCssClass);
        if (this.$selectedIndex >= 0) {
            var s = c.get(this.$selectedIndex - this.$offset);
            this.$scrollItemIntoView($(s).addClass(this.selectedCssClass));
        }
    } else {
        var localThis = this;
        this.$itemContainer.children().each(function (idx, el) {
            var t = $(this);
            var a = t.attr("data-cssselected");
            if (a != null && a.length > 0) {
                t.removeClass(a);
                if (idx == localThis.$selectedIndex - this.$offset) {
                    t.addClass(a);
                    localThis.$scrollItemIntoView(t);
                }
            }
        });
    }
};
LookupRepeater.prototype.applySelection = function (curIndex, prevIndex, bodyEl, headEl) {
    this.UpdateHeaders();
    return false; // override and return true if you do not want the default logic to proceed.
};
LookupRepeater.prototype.$createChildren = function () {
    var el = this.$itemContainer;
    if (el == null) return;
    if (this.get_itemTemplate() == null) return;
    el.empty();
    var localThis = this;
    var $items = this.get_items();
    if ($items != null) {
        var item;
        var o;
        if (BaseObject.is($items, "Array")) {
            for (var i = this.$offset; i < $items.length && (this.$limit < 0 || i - this.$offset < this.$limit); i++) {
                item = $items[i];
                o = ViewBase.cloneTemplate(el, this.get_itemTemplate(), item); // var o = $(this.itemTemplate).clone();
                if (this.storeIndexIn != null && this.storeIndexIn.length > 0) {
                    BaseObject.setProperty(item, this.storeIndexIn, i);
                }
                this.on(o, "click", this.onItemClick);
//                o.click(function (evnt) {
//                    localThis.onItemClick(evnt, null);
//                });
                // o.get(0).dataContext = item;
                //el.append(o);
            }
        } else {
            for (item in $items) {
                //var o = $(this.itemTemplate).clone();
                //o.get(0).dataContext = item;
                o = ViewBase.cloneTemplate(el, this.get_itemTemplate(), $items[item]);
                if (this.storeIndexIn != null && this.storeIndexIn.length > 0) {
                    BaseObject.setProperty($items[item], this.storeIndexIn, item);
                }
                this.on(o, "click", this.onItemClick);
//                o.click(function (evnt) {
//                    localThis.onItemClick(evnt, null);
//                });
                //el.append(o);
            }
        }
    }
};