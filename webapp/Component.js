/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "sap/ui/model/json/JSONModel",
        "tabletennistracker/tabletennistracker/model/models"
    ],
    function (UIComponent, Device, JSONModel, models) {
        "use strict";

        return UIComponent.extend("tabletennistracker.tabletennistracker.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // Set up the data model
                const oData = {
                    players: [
                        { name: "Max", wins: 7, losses: 5 },
                        { name: "Dennis", wins: 4, losses: 8 },
                        { name: "Farouk", wins: 4, losses: 4 },
                        { name: "Michael", wins: 5, losses: 3}
                    ]
                };
                const oModel = new JSONModel(oData);
                this.setModel(oModel, "playerModel");
                
                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);