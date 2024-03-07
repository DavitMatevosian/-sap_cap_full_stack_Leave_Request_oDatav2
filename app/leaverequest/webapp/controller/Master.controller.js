sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent"
],
function (Controller, JSONModel, UIComponent) {
    "use strict";

    return Controller.extend("com.app.leaverequest.controller.Master", {
        onInit: function () {
           let model= new JSONModel({
            GetCurrentUser: {}
           })
           let controller = this
           this.getOwnerComponent().setModel(model, "access")
           this.getOwnerComponent().getModel().read("/GetCurrentUser",{success:function(res){
                controller.getOwnerComponent().getModel("access").setProperty("/GetCurrentUser", res.GetCurrentUser)
           }})
        },
        handleRequestsListSelection: function() {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("");
        },
        handleMyLeaveRequestsSelection: function() {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("EmployeeRequestList");
        },
        handleControlLeaveRequestsSelection: function() {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("ControlLeaveRequest");
        }
    });
});
