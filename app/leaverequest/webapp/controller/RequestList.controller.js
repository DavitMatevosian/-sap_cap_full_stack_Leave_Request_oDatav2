sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Sorter, Fragment, MessageBox) {
        "use strict";

        return Controller.extend("com.app.leaverequest.controller.Master", {
            onInit: function () {
                
            },

            onSearch: function (oEvent) {
                let oTableSearchState = [],
                    sQuery = oEvent.getParameter("query");
    
                if (sQuery && sQuery.length > 0) {
                    oTableSearchState = [new Filter("name", FilterOperator.Contains, sQuery)];
                }
    
                this.getView().byId("LeaveRequestTable").getBinding("items").filter(oTableSearchState, "Application");
            },
    
            onAdd: function (oEvent) {
                if (!this._oDialog) {
                    this._oDialog = Fragment.load({
                        id: this.getView().getId(),
                        name: "com.app.leaverequest.view.AddDialog",
                        controller: this
                    }).then(function (oDialog) {
                        this.getView().addDependent(oDialog);
                        return oDialog;
                    }.bind(this));
                }
                this._oDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },
    
            onSubmit: function () {
                let oView = this.getView();
                let oModel = oView.getModel(); 
                let currentUser =   this.getOwnerComponent().getModel("access").getProperty("/GetCurrentUser")
                oModel.createEntry("/LeaveRequest", {
                    properties: {
                        reason: this.getView().byId("reasonInput").getValue(),
                        startDate: this.getView().byId("startDateInput").getDateValue(),
                        endDate: this.getView().byId("endDateInput").getDateValue(),
                        leaveType: this.getView().byId("leaveTypeInput").getValue(),
                        status: "Pending",
                        employee_ID : currentUser.employeeId
                    },
                });
                oModel.submitChanges({
                    success: function () {
                      MessageBox.success(`LeaveRequest has been successfully added.`);
                      oModel.refresh()
                    }
                  });
                this.onCancel()
            },            
    
            onCancel: function () {
                this._oDialog.then(function (oDialog) {
                    oDialog.close();
                });
            },
    
            onSort: function (oEvent) {
                this._bDescendingSort = !this._bDescendingSort;
                let oView = this.getView(),
                    oTable = oView.byId("LeaveRequestTable"),
                    oBinding = oTable.getBinding("items"),
                    oSorter = new Sorter("name", this._bDescendingSort);
    
                oBinding.sort(oSorter);
            }
        });
    });
