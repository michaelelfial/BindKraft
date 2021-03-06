
/*
    File: Date.js
    Date object additions and OOP behavior
*/

//var ar = this.async(this.mymethod).execute(arg1, arg2, arg3 ...)
// Date simulation of BaseObject compatibility
Date.prototype.parent = null;
Date.classType = "Date";
Date.prototype.classType = function () {
    return this.constructor.classType;
};
Date.prototype.inherits = function (cls) {
    if (this.classType() == cls) return true;
    return false;
};
Date.interfaces = { PArray: true };
Date.prototype.supports = function (prot) {
    if (this.constructor.interfaces[prot]) return true;
    return false;
};
Date.prototype.is = function (clsOrProt) {
    var t = clsOrProt;
    if (BaseObject.typeOf(clsOrProt) != "string") {
        t = BaseObject.typeOf(clsOrProt);
    }
    if (this.inherits(t)) return true;
    if (this.supports(t)) return true;
    return false;
};
Date.prototype.fullClassType = function (childClasses) {
    var s = childClasses ? childClasses : "";
    s = this.classType() + ((s.length > 0) ? ("::" + s) : "");
    return s;
};
Date.prototype.equals = function (obj) {
    if (obj == null) return false;
    if (this.fullClassType() != BaseObject.fullTypeOf(obj)) return false;
    return (obj.getTime() == this.getTime());
    //return true;
};
Date.prototype.compareTo = function (obj) {
    if (BaseObject.is(obj, "Date")) {
		return this.getTime() - obj.getTime();
	} else if (obj == null) {
		return 1;
	} else {
		return -1;
	}
};
Date.prototype.obliterate = function() {
	// Do nothing for now
}

// JSON extensions
Date.prototype.toJSON = function (key) {
    return "\\/Date(" + this.getTime().toString() + ")\\/";
};
Date.reJSONMSFormat = /\/Date\(([+-]?\d+)\)\//i;
Date.isJSONMSFormat = function(str) {
	if (typeof str == "string") {
		var matches = Date.reJSONMSFormat.exec(str);
		if (matches != null) {
			return true;
		}
	}
	return false;
}
Date.fromJSON = function(str) {
	if (str == null) return null;
	if (typeof str == "string") {
		var matches = Date.reJSONMSFormat.exec(str);
		if (matches != null) {
			var parsing = parseInt(matches[1], 10);
			var result = new Date(parsing);
			return result;
		}
	}
	return str;
}
// "\\/Date(1328610979110)\\/"

// TODO: Fix this soon!
Date.Now = function () {
    var date = new Date();
    var utcDate = new Date();
    utcDate.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    utcDate.setUTCHours(date.getHours());
    utcDate.setUTCSeconds(date.getSeconds());
    utcDate.setUTCMilliseconds(date.getMilliseconds());

    return utcDate;
};
// This is standard javascript function we overrode long ago and forgot to free up.
// If you have problems - use Now instead of now, but don't uncomment this!
// Date.now = Date.Now; /* OH !!! */
Date.create = function (year, month, day) {
    var date = (arguments.length > 0)?new Date(year, month, day):new Date();
    var utcDate = new Date();
    utcDate.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    utcDate.setUTCHours(date.getHours());
    utcDate.setUTCMinutes(date.getMinutes());
    utcDate.setUTCSeconds(date.getSeconds());
    utcDate.setUTCMilliseconds(date.getMilliseconds());
    return utcDate;
};