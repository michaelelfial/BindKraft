function ILocalProxyCollection() {}
ILocalProxyCollection.Interface("ILocalProxyCollection","IManagedInterface");
ILocalProxyCollection.prototype.count = function() { throw "not impl" };
ILocalProxyCollection.prototype.item = function(index) { throw "not impl" }.ReturnType(IManagedInterface);
	