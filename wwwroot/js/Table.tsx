import * as React from "react";
//import { ITableItem, rawTableItems } from "./TableData";

import { ObservableArray, ObservableValue } from "azure-devops-ui/Core/Observable";
import { GitHubIssues } from "./githubissues";

import { Card } from "azure-devops-ui/Card";
import {
    ColumnFill,
    ColumnSorting,
    renderSimpleCell,
    sortItems,
    SortOrder,
    Table,
    ISimpleTableCell
} from "azure-devops-ui/Table";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";

interface IState {
    tableItems: ITableItem[];
}

export interface ITableItem extends ISimpleTableCell {
    repoName: string;
    numIssues: number;
    //gender: string;
}

export default class TableSortableExample extends React.Component<{}, IState>{
    public render(): JSX.Element {
        return (
            <Card className="flex-grow bolt-table-card" contentProps={{ contentPadding: false }}>
                <Table<ITableItem>
                    behaviors={[this.sortingBehavior]}
                    columns={columns}
                    itemProvider={new ArrayItemProvider(this.state.tableItems)}
                    role="table"
                />
            </Card>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            tableItems: []
        };

        this.GetIssues();
    }

    private async GetIssues(): Promise<void> {
        let gitHubIssues: GitHubIssues = new GitHubIssues();        
        const tableItems = await gitHubIssues.GetGitHubIssues("microsoft");
        this.setState({ tableItems });
    }

    //function GetSortingBehavior(tableItems: ITableItem[]): ColumnSorting<ITableItem> {
    // Create the sorting behavior (delegate that is called when a column is sorted).
    readonly sortingBehavior = new ColumnSorting<ITableItem>(
        (
            columnIndex: number,
            proposedSortOrder: SortOrder,
            event: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
        ) => {
            this.state.tableItems.splice(
                0,
                this.state.tableItems.length,
                ...sortItems<ITableItem>(
                    columnIndex,
                    proposedSortOrder,
                    sortFunctions,
                    columns,
                    this.state.tableItems // used to be rawTableItems
                )
            );
        }
    );
}

const columns = [
    {
        id: "repoName",
        minWidth: 50,
        name: "Repo Name",
        onSize: onSize,
        readonly: true,
        renderCell: renderSimpleCell,
        sortProps: {
            ariaLabelAscending: "Sorted A to Z",
            ariaLabelDescending: "Sorted Z to A"
        },
        width: new ObservableValue(200)
    },
    {
        id: "numIssues",
        maxWidth: 300,
        name: "Issues",
        onSize: onSize,
        readonly: true,
        renderCell: renderSimpleCell,
        sortProps: {
            ariaLabelAscending: "Sorted low to high",
            ariaLabelDescending: "Sorted high to low"
        },
        width: new ObservableValue(100)
    },
    //{
    //    id: "gender",
    //    name: "Gender",
    //    width: new ObservableValue(100),
    //    readonly: true,
    //    renderCell: renderSimpleCell
    //},
    ColumnFill
];

function GetSortingBehavior(tableItems: ITableItem[]): ColumnSorting<ITableItem> {
    // Create the sorting behavior (delegate that is called when a column is sorted).
    return new ColumnSorting<ITableItem>(
        (
            columnIndex: number,
            proposedSortOrder: SortOrder,
            event: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
        ) => {
            tableItems.splice(
                0,
                tableItems.length,
                ...sortItems<ITableItem>(
                    columnIndex,
                    proposedSortOrder,
                    sortFunctions,
                    columns,
                    tableItems // used to be rawTableItems
                )
            );
        }
    );
}

const sortFunctions = [
    // Sort on Name column
    (item1: ITableItem, item2: ITableItem): number => {
        return item1.repoName!.localeCompare(item2.repoName!);
    },

    // Sort on Issues column
    (item1: ITableItem, item2: ITableItem): number => {
        return item1.numIssues - item2.numIssues;
    },

    // Gender column does not need a sort function
    null
];

// Initialize our table items with the declared items sorted by the Name column ascending.
//const tableItems = new ObservableArray<ITableItem>(rawTableItems);

function onSize(event: MouseEvent, index: number, width: number) {
    (columns[index].width as ObservableValue<number>).value = width;
}