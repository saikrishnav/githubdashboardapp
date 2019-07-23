import * as React from "react";

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