"use client";
import React from "react";
import FindProduct from "./components/FindProduct";
import { DataTable } from "./components/Product/Product";
import { columns } from "./components/Product/columns";
import { DataTablePagination } from "./components/Pagination";
import Filter from "./components/Filter";
// import { PaginationDemo } from "./components/Pagination";

export default function Page() {

  const [data, setData] = React.useState([])

  const submit = async (data:any) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/company/${data.company}/categories/${data.category}/products`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await res.json();
      setData(result)
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
  
  return (
    <div className="m-5 flex flex-col gap-5">
      <FindProduct submit={submit}/>
      {data.length > 0 && (
        <div className="flex flex-col gap-5">
          <Filter />
          <DataTable data={data} columns={columns} />
        </div>
      )}
      {/* <DataTablePagination /> */}
    </div>
  );
}
