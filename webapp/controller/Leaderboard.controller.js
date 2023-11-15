sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator) {
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

            onFilterLeaderboard(oEvent) {
                const aFilter = [];
                const sQuery = oEvent.getParameter("query");
                if (sQuery) {
                    aFilter.push(new Filter("name", FilterOperator.Contains, sQuery))
                }
                const oTable = this.byId("leaderboardList");
                const oBinding = oTable.getBinding("items");
                oBinding.filter(aFilter);
            }
        });
    });
