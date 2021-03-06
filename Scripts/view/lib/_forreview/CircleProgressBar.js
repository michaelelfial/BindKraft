function CircleProgressBar() {
    Base.apply(this, arguments);
}

CircleProgressBar.Inherit(Base, "CircleProgressBar");
CircleProgressBar.Implement(IUIControl);
CircleProgressBar.Implement(ITemplateSourceImpl, new Defaults("templateName", "bindkraftstyles/control-circleprogressbar"));
CircleProgressBar.$defaults = {
	templateName: "bindkraftstyles/control-circleprogressbar"
};

CircleProgressBar.ImplementActiveProperty("currentprogress", new InitializeStringParameter("The current progress.", 0), null, true, "Update");

//Drawing parameters
CircleProgressBar.ImplementProperty("radius", new InitializeStringParameter("", "85"));
CircleProgressBar.ImplementProperty("baselinewidth", new InitializeStringParameter("", "10"));
CircleProgressBar.ImplementProperty("basecolor", new InitializeStringParameter("", "#b1b1b1"));
CircleProgressBar.ImplementProperty("progresslinewidth", new InitializeStringParameter("", "11"));
CircleProgressBar.ImplementProperty("progresscolor", new InitializeStringParameter("", "#3949AB"));

CircleProgressBar.prototype.init = function () {
    $$(this.root).first().empty().append(this.get_template());
};

CircleProgressBar.prototype.finalinit = function() {
    this.Update();
}

CircleProgressBar.prototype.get_location = function (){
    var linewidth = (this.$baselinewidth >= this.$progresslinewidth) ? this.$baselinewidth : this.$progresslinewidth;
    var location = parseInt(this.$radius) + parseInt(linewidth) / 2;

    return location;
}

CircleProgressBar.prototype.get_size = function (){
    var linewidth = (this.$baselinewidth >= this.$progresslinewidth) ? this.$baselinewidth : this.$progresslinewidth;
    var size = (parseInt(this.$radius) * 2) + parseInt(linewidth);

    return size;
}

CircleProgressBar.prototype.Update = function() {
    if (this.$currentprogress == null || this.$currentprogress == undefined) return;

    $$(this.root).first().styles("width", this.get_size() + "px").styles("height", this.get_size() + "px");
    $$(this.root).first().styles("position", "relative").styles("display", "inline-block");
    $$(this.child("progresscanvas")).first().attributes("width", this.get_size()).attributes("height", this.get_size());

    var progressText = $$(this.child("progresspercentage")).first();
    progressText.innerHtml(this.$currentprogress + " %");
    progressText.styles("position", "absolute");
    progressText.styles("font-size", "200%");
    
    //TODO
    var progressWidthFix = progressText.getNative().offsetWidth / 2;
    var progressHeightFix = progressText.getNative().offsetHeight / 2;
    progressText.styles("top", ((this.get_size() / 2) - progressWidthFix) + "px");
    progressText.styles("left", ((this.get_size() / 2) - progressHeightFix) + "px");
    //---

    this.Draw(this.$currentprogress);
}

CircleProgressBar.prototype.Draw = function(percentage) {
    var canvasElement = $$(this.child("progresscanvas")).first().getNative();
    var canvasDrawing = canvasElement.getContext("2d");

    //For smoother image
    canvasDrawing.mozImageSmoothingEnabled = true;
    canvasDrawing.webkitImageSmoothingEnabled = true;
    canvasDrawing.msImageSmoothingEnabled = true;
    canvasDrawing.imageSmoothingEnabled = true;

    canvasDrawing.beginPath();
    canvasDrawing.strokeStyle = this.get_basecolor();
    canvasDrawing.lineWidth = this.get_baselinewidth();
    canvasDrawing.arc(this.get_location(), this.get_location(), this.get_radius(), (Math.PI/180) * 270, (Math.PI/180) * (270 + 360));
    canvasDrawing.stroke();

    if (percentage != undefined){
        canvasDrawing.beginPath();
        canvasDrawing.strokeStyle = this.get_progresscolor();
        canvasDrawing.lineWidth = this.get_progresslinewidth();
        canvasDrawing.arc(this.get_location(), this.get_location(), this.get_radius(), (Math.PI/180) * 270, (Math.PI/180) * (270 + ((percentage /100) * 360)));
        canvasDrawing.stroke();
    }
}