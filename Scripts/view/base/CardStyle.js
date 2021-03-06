


/*CLASS*/
var CardStyle = function (obj) {
    this.headerColor = "#FFFFFF";
    this.headerTextColor = "#000000";
    if (obj != null) {
        for (var i = 0; i < CardStyle.supportedProperties.length; i++) {
            if (obj[CardStyle.supportedProperties[i]] != null) {
                this[CardStyle.supportedProperties[i]] = obj[CardStyle.supportedProperties[i]];
            }
        }
    }
};
CardStyle.Inherit(BaseObject, "CardStyle");
CardStyle.supportedProperties = ["headerColor", "headerTextColor"];
