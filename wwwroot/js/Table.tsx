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
    ISimpleTableCell
} from "azure-devops-ui/Table";

interface IState {}

export interface ITableItem extends ISimpleTableCell {
    repoName: string;
    repoLink: string;
    numIssues: number;
}

let rawTableItems: ITableItem[] = [];
const tableItems = new ObservableArray<ITableItem>();

export default class TableSortableExample extends React.Component<{}, IState> {
    public render(): JSX.Element {
        return (
            <Card className="flex-grow bolt-table-card" contentProps={{ contentPadding: false }}>
                <Table<ITableItem>
                    behaviors={[sortingBehavior]}
                    columns={columns}
                    itemProvider={tableItems}
                    role="table"
                    scrollable={true}
                    maxHeight={10}
                />
            </Card>
        );
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.GetIssues("microsoft", 1);
    }

    private async GetIssues(organization: string, page: number): Promise<void> {
        let gitHubIssues: GitHubIssues = new GitHubIssues();
        let newTableItems: ITableItem[] = await gitHubIssues.GetGitHubIssues(organization, page);
        rawTableItems.push(...newTableItems);

        tableItems.push(...rawTableItems);
        this.setState({});
    }
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
                columns,
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
    (columns[index].width as ObservableValue<number>).value = width;
}