


/*CLASS*/
function DelayedTargetedMessage(target, delay) {
    TargetedMessage.apply(this, arguments);
    this.delay = delay;
};
DelayedTargetedMessage.Inherit(TargetedMessage, "DelayedTargetedMessage");
DelayedTargetedMessage.Implement(IDelayedMessage);
DelayedTargetedMessage.callMeLater = function (target, delay, handler, data) {
    var delegate = new Delegate(target, handler);
    var msg = new DelayedTargetedMessage(delegate, delay);
    msg.data = data;
    Messenger.Default.subscribe(DelayedTargetedMessage, delegate, true);
    Messenger.Default.post(msg);
};