sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Sorter',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Sorter, Filter,FilterOperator) {
        "use strict";

        return Controller.extend("com.app.leaverequest.controller.ControlLeaveRequest", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("EmployeeRequestList").attachPatternMatched(this.onEmployeeMatched, this);
            },
            onEmployeeMatched: function(){
                let currentUser =   this.getOwnerComponent().getModel("access").getProperty("/GetCurrentUser")
                let oFilter = new Filter("employee_ID", FilterOperator.EQ, currentUser.employeeId);
                let oEmployeeRequestListsBinding = this.getView().byId("EmployeeRequestList").getBinding("items");
                oEmployeeRequestListsBinding.filter([oFilter]); 
            },
            onSort: function (oEvent) {
                this._bDescendingSort = !this._bDescendingSort;
                let oView = this.getView(),
                    oTable = oView.byId("LeaveRequest"),
                    oBinding = oTable.getBinding("items"),
                    oSorter = new Sorter("name", this._bDescendingSort);

                oBinding.sort(oSorter);
            }
        });
    });
