function IEventSubscriber() {}
IEventSubscriber.Interface("IEventSubscriber");
IEventSubscriber.prototype.subscribeFor = function(eventDisp, handler, priority) { throw "not impl"; }
IEventSubscriber.prototype.unsubscribeAll = function() { throw "not impl"; }