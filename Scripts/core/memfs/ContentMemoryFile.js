function ContentMemoryFile(contenttype, content) {
	BaseObject.apply(this,arguments);
	this.set_contenttype(contenttype);
	if (content != null) {
		// Alsoe sets available
		this.set_content(content);
	}
	this.set_dirty(false);
	
}
ContentMemoryFile.Inherit(BaseObject, "ContentMemoryFile");
ContentMemoryFile.Implement(IMemoryFileImpl);
ContentMemoryFile.ImplementEx(IMemoryFileContent);
ContentMemoryFile.ImplementEx(IMemoryFilePersistable);

// IMemoryFileContent
// When this property is true thr $content and $contenttype must not change the times and flags of the file!
ContentMemoryFile.prototype.$restoremode = false;
ContentMemoryFile.prototype.set_restoremode = function(v) { this.$restoremode = (v?true:false); }
ContentMemoryFile.prototype.get_restoremode = function() { return this.$restoremode; }

ContentMemoryFile.prototype.$content = null;
ContentMemoryFile.prototype.get_content = function() { return this.$content; }
ContentMemoryFile.prototype.set_content = function(v) { 
	if (!this.$restoremode) this.touch();
	this.$content = v;
	this.set_available(true);
}
ContentMemoryFile.prototype.$contenttype = null;
ContentMemoryFile.prototype.get_contenttype = function() { return this.$contenttype; }
ContentMemoryFile.prototype.set_contenttype = function(v) { 
	if (!this.$restoremode) this.touch();
	this.$contenttype = v; 
}

// IMemoryFilePersistable
ContentMemoryFile.prototype.$dirty = false;
ContentMemoryFile.prototype.set_dirty = function(v) { this.$dirty = (v?true:false); }
ContentMemoryFile.prototype.get_dirty = function() { return this.$dirty; }

ContentMemoryFile.prototype.$available = false;
ContentMemoryFile.prototype.set_available = function(v) { this.$available = (v?true:false); }
ContentMemoryFile.prototype.get_available = function() { return this.$available; }

