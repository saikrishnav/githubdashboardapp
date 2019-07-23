import * as React from "react";
import { ITableItem, rawTableItems } from "./TableData";

import { ObservableArray, ObservableValue } from "azure-devops-ui/Core/Observable";

import { Card } from "azure-devops-ui/Card";
import {
    ColumnFill,
    ColumnSorting,
    renderSimpleCell,
    sortItems,
    SortOrder,
    Table
} from "azure-devops-ui/Table";

export default class TableSortableExample extends React.Component {
    public render(): JSX.Element {
        return (
            <Card className="flex-grow bolt-table-card" contentProps={{ contentPadding: false }}>
                <Table<ITableItem>
                    behaviors={[sortingBehavior]}
                    columns={columns}
                    itemProvider={tableItems}
                    role="table"
                />
            </Card>
        );
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
    //{
    //    id: "gender",
    //    name: "Gender",
    //    width: new ObservableValue(100),
    //    readonly: true,
    //    renderCell: renderSimpleCell
    //},
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

// Initialize our table items with the declared items sorted by the Name column ascending.
const tableItems = new ObservableArray<ITableItem>(rawTableItems);

function onSize(event: MouseEvent, index: number, width: number) {
    (columns[index].width as ObservableValue<number>).value = width;
}