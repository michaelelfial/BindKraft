function EventDispatchLeasing(typecheck) {
	BaseObject.apply(this, arguments);
	this.$typecheck = typecheck;
	if (this.$typecheck == null) {
		this.$typecheck = "BaseObject";
	}
}
EventDispatchLeasing.Inherit(BaseObject, "EventDispatchLeasing");

EventDispatchLeasing.prototype.$leases = new InitializeObject("Leases { typeN: { inst1: { name1: disp, name2: disp},inst2:{...}}}");
EventDispatchLeasing.prototype.leaseDisp = function(bywhom, name) {
	if (TypeChecker.check(this.$typecheck, bywhom)) {
		var type = bywhom.classType();
		if (this.$leases[type] == null) {
			this.$leases[type] = {};
		}
		var insts = this.$leases[type];
		if (insts[bywhom.$__instanceId] == null) {
			insts[bywhom.$__instanceId] = {};
		}
		var inst = insts[bywhom.$__instanceId];
		if (inst[name] == null) {
			inst[name] = new EventDispatcher(null);
		}
		return inst[name]
	} else {
		return null;
	}
}
EventDispatchLeasing.prototype.getDisp = function(bywhom, name) {
	var type = bywhom.classType();
	if (this.$leases[type] == null) {
		return null;
	}
	var insts = this.$leases[type];
	if (insts[bywhom.$__instanceId] == null) {
		return null;
	}
	var inst = insts[bywhom.$__instanceId];
	if (inst[name] == null) {
		return null;
	}
	return inst[name];
}
EventDispatchLeasing.prototype.$getInstId = function(bywhom) {
	if (BaseObject.is(bywhom, "BaseObject")) {
		return bywhom.$__instanceId;
	} else if (typeof bywhom == "string") {
		return bywhom;
	}
	return null;
}
EventDispatchLeasing.prototype.clearInstDisp = function(bywhom, name) {
	if (BaseObject.is(bywhom,"BaseObject")) {
		var insts = this.$leases[bywhom.classType()];
		if (insts != null) {
			var inst = insts[bywhom.$__instanceId];
			if (inst != null) {
				if (BaseObject.is(inst[name], "EventDispatcher")) {
					inst[name].removeAll();
					inst[name].obliterate();
				}
				delete inst[name];
			}
		}
	}
}
EventDispatchLeasing.prototype.clearInst = function(bywhom) {
	if (BaseObject.is(bywhom,"BaseObject")) {
		var insts = this.$leases[bywhom.classType()];
		if (insts != null) {
			var inst = insts[bywhom.$__instanceId];
			if (inst != null) {
				for (var name in inst) {
					if (BaseObject.is(inst[name], "EventDispatcher")) {
						inst[name].removeAll();
						inst[name].obliterate();
					}
					delete inst[name];
				}
			}
			delete insts[bywhom.$__instanceId];
		}
	}
}

EventDispatchLeasing.prototype.subscribe = function(op, name, whom) {
	if (!BaseObject.isCallback(whom)) return false;
	var disp = this.leaseDisp(op, name);
	disp.add(whom);
	return true;
}
EventDispatchLeasing.prototype.unsubscribe = function(op, name, whom) {
	if (!BaseObject.isCallback(whom)) return false;
	var disp = this.leaseDisp(op, name);
	disp.remove(whom);
	return true;
}