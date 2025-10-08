import React, { useState } from "react";
import { useDebounce } from "./useDebounce";
import { type PaginationState } from "@tanstack/react-table";

type ReturnUseTableHelper = {
  handleSearch: (event: string) => void;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  searchValue: string;
};

const UseTableHelper = (): ReturnUseTableHelper => {
  const [search, setSearch] = React.useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const searchValue = useDebounce(search, 500);

  const handleSearch = (event: string) => {
    setPagination((prevState) => {
      return {
        ...prevState,
        pageIndex: 0,
      };
    });
    setSearch(event);
  };

  return {
    handleSearch,
    pagination,
    setPagination,
    searchValue,
  };
};

export default UseTableHelper;
