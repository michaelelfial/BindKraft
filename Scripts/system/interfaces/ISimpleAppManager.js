/*INTERFACE*/
function ISimpleAppManager() { }
ISimpleAppManager.Interface("ISimpleAppManager");
ISimpleAppManager.prototype.$appmgr_lastid = 0;
ISimpleAppManager.ImplementActiveIndexedProperty("runningapps", new InitializeArray("A register for the running apps"));
ISimpleAppManager.prototype.$add_runningapps = function (v) {
    if (BaseObject.is(v, "IApp")) {
        v.set_instanceid(this.$appmgr_lastid++);
        v.set_approot(this);
        this.get_runningapps().addElement(v);
    }
}
/*
	TODO: We must set approot window more aggressively 
*/
ISimpleAppManager.prototype.launchApp = function (appCls, placeCallback, displaceCallback, args) {
    var appClass = appCls;
    if (BaseObject.is(appCls, "string")) {
        appClass = Function.classes[appCls];
    }
    var app = new appClass();
    app.placeWindow = Delegate.wrapCallback(placeCallback);
    app.displaceWindow = Delegate.wrapCallback(displaceCallback);
    var self = this;
    app.ExitApp = function () {
        self.shutdownApp(app);
    }
    this.$add_runningapps(app);
    var _args = Array.createCopyOf(args);
	// Inject the callback for the appinitialize as first argument and shift the rest right
    _args.unshift(function (success) {
        if (success) {
            var args_run = Array.createCopyOf(arguments, 1);
            app.run.apply(app, args_run);
        } else {
            self.shutdownApp(app);
        }
    });
    app.appinitialize.apply(app, _args);
}
ISimpleAppManager.prototype.shutdownAllApps = function (optionalcallback) { // Shutdown everything (synchronous for now)
    var app, apps = this.get_runningapps();
    if (BaseObject.is(apps, "Array")) {
        for (var i = apps.length - 1; i >= 0; i--) {
            app = apps[i];
            if (BaseObject.is(app, "IApp")) {
                this.shutdownApp(app);
            }
        }
    }
}
ISimpleAppManager.prototype.shutdownApp = function (app) {
    var _app;
    if (BaseObject.is(app, "IApp")) {
        _app = app;
    } else if (typeof app == "number") {
        _app = this.get_runningapps().FirstOrDefault(function (idx, item) {
            if (item != null && item.get_instanceid() == app) return item;
            return null;
        });
    } else { // We need this in case we use other comparable values (a string for instance). We dare not combine the both blocks for now - of fear that something more specific might be needed in one of the cases
        // TODO: See if this will always be a string or we will allow somethng else to be used as an ID too.
        _app = this.get_runningapps().FirstOrDefault(function (idx, item) {
            if (item != null && item.get_instanceid() == app) return item;
            return null;
        });
    }
    if (_app != null) {
        _app.appshutdown(function () {
            this.get_runningapps().removeElement(app);
        });
    }
}


/*INTERFACE*/
/* Old version - don't delete for now please, Michael
function ISimpleAppManager() { }
ISimpleAppManager.Interface("ISimpleAppManager");

ISimpleAppManager.prototype.$appmgr_lastid = 0;
ISimpleAppManager.ImplementActiveIndexedProperty("runningapps", new InitializeArray("A register for the running apps"));
ISimpleAppManager.prototype.add_runningapps = function (v) {
    if (BaseObject.is(v, "IApp")) {
        v.set_instanceid(this.$appmgr_lastid++);
    }
}
ISimpleAppManager.prototype.launchApp = function (app, placeCallback, displaceCallback, args) {
    this.add_runningapps(app);
    var _args = Array.createCopyOf(args);
    _args.unshift(function (success) {
        if (success) {
            app.placeWindow = Delegate.wrapCallback(placeCallback);
            app.displaceWindow = Delegate.wrapCallback(displaceCallback);
            app.run();
        }
    });
    app.appinitialize.apply(app, _args);
}
ISimpleAppManager.prototype.shutdownApp = function (app) {
    var _app;
    if (BaseObject.is(app, "IApp")) {
        _app = app;
    } else if (typeof app == "number") {
        _app = this.get_runningapps().FirstOrDefault(function (idx, item) {
            if (item != null && item.get_instanceid() == app) return item;
            return null;
        });
    } else {
        _app = this.get_runningapps().FirstOrDefault(function (idx, item) {
            if (item != null && item.get_instanceid() == app) return item;
            return null;
        });
    }
    if (_app != null) {
        _app.appshutdown(function () {
            this.get_runningapps().removeElement(app);
        });
    }
}
*/