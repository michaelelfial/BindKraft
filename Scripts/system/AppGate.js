/**
	This class is introduced in BK 2.18 (officially) as a replacement of a mix of solutions previously giving anchor
	app access to various system or shell provided features. As the previous solutions were experimental and minimally used
	the impact of the change should be minimal and only felt in-house.
	
	Conceptual usage
	
	The SysShell creates one instance of this class for each app it launches (including daemons). The instance is tailored for
	that app (for example: to minimize the number of arguments where possible). The instance thus created is given to the app
	through its constructor (the old queryback interface is deprecated). Simple apps can often entirely get by without using it,
	but others preserve the receved instance and can use it to access API-s, the shell, the running apps though the shell etc.
	
	This setup provides for future non-breaking extensions to this class and keep all the (potentially growing) features provided
	on a separate dedicated instance, thus entirely avoiding the need the app too inherit a growing number of methods for that purpose.
	
	An important detail is that the shell may continue to manipulate the already passed AppGate as the application progresses. Some features
	or parts of them may become available at later phases (see the App related documentation).
	
	Provided features:
	2.18
		- LocalAPIClient
		- Shell query
*/
function AppGate(shell, lapiclient, appClass) {
	BaseObject.apply(this, arguments);
	this.$shell = shell;
	this.$api = lapiclient;
	this.$appClass = appClass;
	this.$container = new LocalProxyContainer();
}
AppGate.Inherit(BaseObject, "AppGate");
// Proxy wrapper
AppGate.$arrayRelease = function() {
	
	if (BaseObject.is(this, "Array")) {
		for (var i = 0; i < this.length; i++) {
			if (BaseObject.is(this[i],"IManagedInterface")) {
				this[i].Release();
			}
		}
	}
}
/**
	A localProxyContainer - all returned proxies are registered here
*/
AppGate.prototype.$container = null;
/**
	Wraps a single reference or an array of same-interface references with a proxy/ies for the given interface
	@param iface {string|interfacedef}	The interface for which to generate a proxy
	@param p	 {BaseObject*}			A reference to the instance implementing the interface
	@returns 	 {LocalProxy}			The proxy. Must be released after use (call Release() in it)
	
	@remarks
*/
AppGate.prototype.wrap = function(iface, p) {
	if (BaseObject.is(p,"BaseObject")) {
		var v = DummyInterfaceProxyBuilder.Default().buildProxy(p, iface);
		if (this.LASTERROR().iserror()) {
			throw "Cannot wrap: " + this.LASTERROR().text();
		}
		return v;
	} else if (BaseObject.is(p, "Array")) {
		// Here we actually allow proxies to be chain-wrapped.
		// This is intentional - the proxies are considered created outside of the control of the code that calls wrap
		// Thus passing them further is considered passind a proxy to a new client, hence a new proxy is needed.
		var arr = Array.createCopyOf(p);
		for (var i = 0; i < arr.length; i++) {
			if (BaseObject.is(arr[i],"BaseObject")) {
				arr[i] = this.wrap(iface,arr[i]);
			}
		}
		arr.Release = AppGate.$arrayRelease;
		return arr;
	}
	return p;
}
//
AppGate.prototype.release = function(p) {
	this.$container.release(p);
}

// Shell interface - similar to old query back
AppGate.prototype.runningInstance = function(_iface) {
	var iface = _iface || "IManagedInterface";
	return this.$container.registerByTarget(this.wrap(iface, this.$shell.getAppByClassName(this.$appClass.classType)));
}
AppGate.prototype.runningInstances = function(_iface) {
	var iface = _iface || "IManagedInterface";
	return this.$container.registerByTarget(this.wrap(iface,this.$shell.getAppsByClassNames(this.$appClass.classType)));
}
AppGate.prototype.bindAppByClassName = function(className, iface) {
	var _iface = iface || "IManagedInterface";
	var app = this.$shell.getAppByClassName(className);
	if (app != null) {
		return this.$container.registerByTarget(this.wrap(_iface, app));
	}
	return null;
}