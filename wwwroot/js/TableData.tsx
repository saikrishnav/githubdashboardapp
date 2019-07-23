import * as React from "react";

import { GitHubIssues } from "./githubissues";

//import { ObservableValue } from "azure-devops-ui/Core/Observable";
//import { ISimpleListCell } from "azure-devops-ui/List";
//import { MenuItemType } from "azure-devops-ui/Menu";
//import { IStatusProps, Status, Statuses, StatusSize } from "azure-devops-ui/Status";
import {
    ColumnFill,
    ColumnMore,
    ColumnSelect,
    ISimpleTableCell,
    renderSimpleCell,
    TableColumnLayout
} from "azure-devops-ui/Table";
//import { css } from "azure-devops-ui/Util";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";

export interface ITableItem extends ISimpleTableCell {
    repoName: string;
    numIssues: number;
    //gender: string;
}

//export const renderStatus = (className?: string) => {
//    return (
//        <Status
//            {...Statuses.Success}
//            ariaLabel="Success"
//            className={css(className, "bolt-table-status-icon")}
//            size={StatusSize.s}
//        />
//    );
//};

export const rawTableItems: ITableItem[] = [
    {
        numIssues: 50,
        repoName: "Borg"
        //{ iconProps: { render: renderStatus }, text: "Rory Boisvert" }
    },
    {
        numIssues: 49,
        repoName: "Darth Vader"
        //repoName: { iconProps: { iconName: "Home", ariaLabel: "Home" }, text: "Sharon Monroe" }
    },
    {
        numIssues: 18,
        repoName: "Lord Voldemort"
        //repoName: { iconProps: { iconName: "Home", ariaLabel: "Home" }, text: "Lucy Booth" }
    }
];


export const tableItems = new ArrayItemProvider<ITableItem>(rawTableItems);
export const tableItemsNoIcons = new ArrayItemProvider<ITableItem>(
    rawTableItems.map((item: ITableItem) => {
        const newItem = Object.assign({}, item);
        newItem.name = { text: newItem.repoName };
        return newItem;
    })
);

let gitHubIssues: GitHubIssues = new GitHubIssues();
gitHubIssues.GetGitHubIssues();

//export function getWeather(query) {
//    const endpoint = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=44db6a862fba0b067b1930da0d769e98';
//    return this.http
//        .get(endpoint)//, {search: searchParams})
//        .map(res => res.json().main)
//        .subscribe(res => {
//            this.weather = data;
//        });
//}