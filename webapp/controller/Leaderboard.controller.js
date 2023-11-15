sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("tabletennistracker.tabletennistracker.controller.Leaderboard", {
            onInit: function () {
                // Get the JSON model from the Component
            const oComponent = this.getOwnerComponent();
            const oModel = oComponent.getModel("playerModel");

            // Get the players array and sort it based on wins
            const aPlayers = oModel.getProperty("/players");
            aPlayers.sort(function (a, b) {
                return b.wins - a.wins; // Sort in descending order based on wins
            });

            // Assign a ranking based on the sorted order
            aPlayers.forEach(function (player, index) {
                player.ranking = index + 1;
            });

            // Create a new JSON model with the sorted players
            const oSortedModel = new JSONModel({
                players: aPlayers
            });

            // Set the sorted model to the view
            this.getView().setModel(oSortedModel, "playerModel");
            },

            onFilterInvoices(oEvent) {
                const aFilter = [];
                const sQuery = oEvent.getParameter("query");
                if (sQuery) {
                    aFilter.push(new FileSystemEntry("name", FilterOperator.Contains, sQuery))
                }

                const oTable = this.byId("leaderboardTable");
                const oBinding = oTable.getBinding("items");
                oBinding.filter(aFilter);
            }
        });
    });
