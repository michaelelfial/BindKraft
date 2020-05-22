function KeyedTokenStorage() {
    BaseObject.apply(this,arguments);
}
KeyedTokenStorage.Inherit(BaseObject, "KeyedTokenStorage")
    .Implement(IQueryTokenStorage);


KeyedTokenStorage.prototype.$storage = new InitializeArray("The storage itself");

KeyedTokenStorage.prototype.registerToken = function( /*KeyedTokenItem|string*/ key_item, /*optional, string*/ token) {
    if (!BaseObject.is(key_item, "KeyedTokenItem")) {
        if (typeof key_item == "string") {
            if (typeof token != "string" || token == null) {
                return false;
            }
            key_item = new KeyedTokenItem(key_item, token);
            return this.$storage.addElement(key_item);
        } else {
            throw "key_item parameter is not of an expected type (KeyedTokenItem|string)";
        }
    }
}
KeyedTokenStorage.prototype.unregisterToken = function(key_item) {
    var kti = null;
    if (typeof key_item == "string") {
        kti = this.getItem(key);
    }
    if (BaseObject.is(key_item,"KeyedTokenItem")) {
        kti = key_item;
    }
    if (kti != null) {
        this.$storage.removeElement(kti);
    }
    return false;
}

KeyedTokenStorage.prototype.getItem = function(key) { //: KeyewdTokenItem
    var kti = this.$storage.FirstOrDefault(function(index, item) {
        if (item.checkKey(key)) return item;
        return null;
    });
    return kti;
}
KeyedTokenStorage.prototype.getToken = function(key) { //: KeyewdTokenItem
    var kti = this.getItem(key);
    if (kti != null) return kti.get_token();
    return null;
}