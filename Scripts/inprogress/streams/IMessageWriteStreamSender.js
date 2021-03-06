function IMessageWriteStreamSender() {}
IMessageWriteStreamSender.Interface("IMessageWriteStreamSender");
IMessageWriteStreamSender.prototype.sendMessage = function(msg) {
	throw Class.notImplemented(this, "sendMessage");
}.Description("Must be internally called with dequeued message to send it to the target.");
IMessageWriteStreamSender.prototype.sendResponse = function(response, msg) {
	throw Class.notImplemented(this, "sendResponse");
}.Description("Direct responses (if any) of the target to this method and implement behavior effects if desired.")
	.Param("msg","Optional - the message for which");