import { DataGrid, type GridRowModel, type GridValidRowModel } from "@mui/x-data-grid";

interface TableData<T extends GridValidRowModel = GridValidRowModel> {
    /**
     * Additional `pageInfo` for advanced use-cases.
     * `hasNextPage`: When row count is unknown/estimated, `hasNextPage` will be used to check if more records are available on server.
     */
    pageInfo?: {
        hasNextPage?: boolean;
        nextCursor?: string;
    };
    /**
     * To reflect updates in total `rowCount` (optional).
     * Useful when the `rowCount` is inaccurate (for example when filtering) or not available upfront.
     */
    rowCount?: number;
    /**
     * The paged, filtered and sorted items from the database
     */
    rows: GridRowModel<T>[];
}

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const data: TableData<User> = {
  rows: [
    { id: 0, name: "Alice", age: 30, email: "alice@example.com" },
    { id: 1, name: "Bob", age: 25, email: "bob@example.com" },
  ],
};

export function App() {
  return (
    <DataGrid
      filterMode="client"
      sortingMode="client"
      paginationMode="client"
      pageSizeOptions={[5, 10, 20, 40, 80]}
      rows={data.rows}
      rowCount={data.rows.length}
      ignoreDiacritics
      getRowHeight={() => "auto"}
      showToolbar
      columns={[
        {
          field: "name",
          headerName: "Name",
        },
        {
          field: "age",
          headerName: "Age",
          type: "number",
        },
        {
          field: "email",
          headerName: "Email",
        },
      ]}
    />
  );
}
