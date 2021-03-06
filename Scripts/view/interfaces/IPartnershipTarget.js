


/*INTERFACE*/
function IPartnershipTarget() {}
IPartnershipTarget.Interface("IPartnershipTarget");
IPartnershipTarget.RequiredTypes("IUIControl");
IPartnershipTarget.prototype.advisePartner = function(partner, prot1, prot2, prot3) {
	throw "advisePartner is not implemented in " + this.fullClassType();
}.Description("This method is called by initiator of a partnership, usually from its postinit or init method. The advised control should wire itseld with the intiator if it supports a joint behaviour over the specified interfaces.")
 .Param("partner", "A reference to the initiator")
 .Param("prot1","One or more Interface names announced by the initiator as relevant for partnership");

 