import { useState } from "react";

enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export const useSort = (defaultSortField: string|null) => {
  const [sortDirection, setSortDirection] = useState(SortDirection.DESC);
  const [sortField, setSortField] = useState(defaultSortField);

  const onSort = (newSortField: string) => {
    if (sortField === newSortField) {
      setSortDirection(sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC)
      return;
    }
    setSortDirection(SortDirection.DESC)
    setSortField(newSortField)
  }

  return {
    sortDirection,
    sortField,
    onSort
  }

};
