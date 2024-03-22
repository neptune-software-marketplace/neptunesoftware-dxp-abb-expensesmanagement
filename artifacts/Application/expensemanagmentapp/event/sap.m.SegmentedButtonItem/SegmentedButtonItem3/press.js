const binding = oListTrips.getBinding("items");
const filter = new sap.ui.model.Filter("status", "EQ", "Approved");
binding.filter([filter]);
