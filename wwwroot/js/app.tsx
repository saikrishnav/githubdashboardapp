import * as React from "react";
import * as ReactDOM from "react-dom";
import Table from "./Table";
import "./iconFont.css";

import { SurfaceBackground, SurfaceContext } from "azure-devops-ui/Surface";

var doc = document.getElementById("org-repositories");
var demo = document.getElementById("DemoAppMode");
if (doc || demo) {
    ReactDOM.render(
        <SurfaceContext.Provider value={{ background: SurfaceBackground.neutral }}>
            <Table />
        </SurfaceContext.Provider>,
        document.getElementById("issueDashboard")
    );

    var dashboard = document.getElementById("issueDashboard")
    var cards = dashboard.getElementsByClassName("flex-grow bolt-table-card bolt-card flex-column depth-8 bolt-card-white");
    if (cards && cards[0] && cards[0] instanceof HTMLElement) {
        (cards[0] as HTMLElement).style.height = "500px";
    }
}

var azureDevOpsStyle = document.head.getElementsByTagName("style")[0]
azureDevOpsStyle.innerHTML = azureDevOpsStyle.innerHTML.replace("display: flex;", "")