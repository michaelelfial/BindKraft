


var StandardBindingFunctions = {
    lookup: function (obj, lkp, prop, key) {
        if (BaseObject.is(lkp, "Array")) {
            return lkp.FirstOrDefault(function (idx, item) {
                if (item[prop] == key) return idx;
            });
        } else {
            return null;
        }
    }
	
};

Binding.bindingLibrary.std = StandardBindingFunctions;