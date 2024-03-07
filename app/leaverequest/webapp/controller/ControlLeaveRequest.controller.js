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

        return Controller.extend("com.app.leaverequest.controller.ControlLeaveRequest", {
            onInit: function () {

            },
            onEmployeePress: function (oEvent) {
                let oBindingContext; 
            
                if (!this._oEditDialog) {
                    this._oEditDialog = Fragment.load({
                        id: this.getView().getId(),
                        name: "com.app.leaverequest.view.EditDialog",
                        controller: this
                    }).then(function (oDialog) {
                        this.getView().addDependent(oDialog);
                        oBindingContext = oDialog.getBindingContext(); 
                        return oDialog;
                    }.bind(this));
                }
            
                this._oEditDialog.then(function (oDialog) {
                    oDialog.setBindingContext(oBindingContext);
                    oDialog.open();
                });
            },

            onSave: function () {
                let controller = this
                let oModel = this.getView().getModel();
                let requsetObject =this.byId("LeaveRequestTable").getSelectedItem().getBindingContext().getObject()
                const updateRequest = {
                    comments: this.byId("commentsInput").getValue(),
                    status: this.byId("statusInput").getSelectedKey()
                }
                const path = oModel.createKey("/LeaveRequest",{
                    ID: requsetObject.leaveRequestID
                })
                oModel.update(path,updateRequest,{
                    success: function () {
                        MessageBox.success("Changes saved successfully.");
                        oModel.refresh()
                        controller.onCancel()
                    },
                });
            },

            onCancel: function () {
                this.byId("EditDialog").close();
            },

            onSearch: function (oEvent) {
                let oTableSearchState = [],
                    sQuery = oEvent.getParameter("query");

                if (sQuery && sQuery.length > 0) {
                    oTableSearchState = [new Filter("name", FilterOperator.Contains, sQuery)];
                }

                this.getView().byId("LeaveRequest").getBinding("items").filter(oTableSearchState, "Application");
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
