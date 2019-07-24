import * as React from "react";
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
    ISimpleTableCell,
    TableColumnLayout
} from "azure-devops-ui/Table";

interface IState {}

export interface ITableItem extends ISimpleTableCell {
    repoName: string;
    repoLink: string;
    numIssues: number;
}

let rawTableItems: ITableItem[] = [];
let tableItems = new ObservableArray<ITableItem | ObservableValue<ITableItem | undefined>>
    (new Array(10).fill(new ObservableValue<ITableItem | undefined>(undefined)));

export default class TableSortableExample extends React.Component<{}, IState> {
    public render(): JSX.Element {
        return (
                <Card className="flex-grow bolt-table-card" contentProps={{ contentPadding: true }}>
                        <Table<ITableItem>
                            behaviors={[sortingBehavior]}
                            columns={asyncColumns}
                            itemProvider={tableItems}
                            role="table"
                            scrollable={true}
                            />
                </Card>
        );
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.GetIssues(1);
    }

    private async GetIssues(page: number): Promise<void> {
        let gitHubIssues: GitHubIssues = new GitHubIssues();
        let newTableItems: ITableItem[] = await gitHubIssues.GetGitHubIssues(page);
        rawTableItems.push(...newTableItems);

        tableItems.removeAll();
        tableItems.push(...rawTableItems);
        this.setState({});
    }
}

let asyncColumns = [
    {
        columnLayout: TableColumnLayout.singleLinePrefix,
        id: "repoName",
        maxWidth: 300,
        name: "Repo Name",
        onSize: onSize,
        readonly: true,
        renderCell: renderSimpleCell,
        sortProps: {
            ariaLabelAscending: "Sorted A to Z",
            ariaLabelDescending: "Sorted Z to A"
        },
        width: new ObservableValue(300)
    },
    {
        columnLayout: TableColumnLayout.none,
        id: "numIssues",
        maxWidth: 100,
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
    ColumnFill
];

// Create the sorting behavior (delegate that is called when a column is sorted).
const sortingBehavior = new ColumnSorting<ITableItem>(
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
                asyncColumns,
                rawTableItems
            )
        );
    }
);

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

function onSize(event: MouseEvent, index: number, width: number) {
    (asyncColumns[index].width as ObservableValue<number>).value = width;
}