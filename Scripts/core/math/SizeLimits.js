/*CLASS*/
/**
 * 
 * @param {Size|number} minsize Both max/min are number or both are Size!
 * @param {Size|number} maxsize 
 * optional:
 * @param {Size} _minsize 
 * @param {Size} _maxsize 
 */
function SizeLimits(minsize, maxsize,/*optional*/ _minsize, _maxsize) {
	var sizeset = false;
	Size.apply(this,arguments);
	if (BaseObject.is(minsize,"Size")) {
		
		if (BaseObject.is(minsize,"Size")) {
			sizeset = true;
			Size.call(this, minsize.w,minsize.h);
			this.set_minsize(minsize);
		}
		if (BaseObject.is(maxsize,"Size")) {
			if (!sizeset) {
				sizeset = true;
				Size.call(this, maxsize.w,maxsize.h);
			} else {
				Size.call(this, this.w,this.h); // Looks pointless?
			}
			this.set_maxsize(maxsize);
		}
		
	} else if (typeof minsize == "number" && typeof maxsize == "number") {
		Size.call(this, minsize,maxsize);
		this.set_minsize(_minsize);
		this.set_maxsize(_maxsize);
	} else {
		Size.apply(this, arguments); // We use FATE algorithm :P
	}
}
SizeLimits.Inherit(Size,"SizeLimits");
SizeLimits.Implement(IObjectifiable);
SizeLimits.prototype.objectifyInstance = function() {
	var o = {
		$__className: "SizeLimits",
		minsize: IObjectifiable.objectify(this.get_minsize()),
		maxsize: IObjectifiable.objectify(this.get_maxsize())
	}
	IObjectifiable.objectifyToAs(o, this, "Size");
	return o;
}
SizeLimits.prototype.individualizeInstance = function(v) {
	if (v != null && typeof v == "object" && this.is("SizeLimits")) {
		Size.prototype.individualizeInstance.call(this,v);
		this.set_minsize(IObjectifiable.instantiate(v.minsize));
		this.set_maxsize(IObjectifiable.instantiate(v.maxsize));
	}
}
SizeLimits.prototype.get_hasminsize = function() {
	return (BaseObject.is(this.$minsize, "Size") && this.$minsize.get_isvalid());
}
SizeLimits.prototype.get_hasmaxsize = function() {
	return (BaseObject.is(this.$maxsize, "Size") && this.$maxsize.get_isvalid());
}
SizeLimits.prototype.$maxsize = null;
SizeLimits.prototype.$minsize = null;
SizeLimits.prototype.get_maxsize = function() {
	if (BaseObject.is(this.$maxsize,"Size")) {
		return this.$maxsize;
	} else {
		return new Size(this);
	}
}
SizeLimits.prototype.set_maxsize = function(v) {
	if (v == null) {
		this.$maxsize = null;
		return;
	}
	if (BaseObject.is(v,"Size") || BaseObject.is(v,"Point") || BaseObject.is(v,"Rect") || BaseObject.is(v,"object")) {
		this.$maxsize = new Size(v);
	} else {
		throw "Unsupported type";
	}
}
SizeLimits.prototype.get_minsize = function() {
	if (BaseObject.is(this.$minsize,"Size")) {
		return this.$minsize;
	} else {
		return new Size(this);
	}
}
SizeLimits.prototype.set_minsize = function(v) {
	if (v == null) {
		this.$minsize = null;
		return;
	}
	if (BaseObject.is(v,"Size") || BaseObject.is(v,"Point") || BaseObject.is(v,"Rect") || BaseObject.is(v,"object")) {
		this.$minsize = new Size(v);
	} else {
		throw "Unsupported type";
	}
}
