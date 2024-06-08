import React from "react";
import FindProduct from "./components/FindProduct";
import { DataTable } from "./components/Product/Product";
import { columns } from "./components/Product/columns";
import { DataTablePagination } from "./components/Pagination";
import Filter from "./components/Filter";
// import { PaginationDemo } from "./components/Pagination";

export default function Page() {
  const data = [
    {
      productName: "Samsung Galaxy S21",
      price: 1000,
      rating: 4.5,
      discount: 10,
      availability: "In Stock",
    },
    {
      productName: "Samsung Galaxy S20",
      price: 900,
      rating: 4.0,
      discount: 15,
      availability: "Out of Stock",
    },
    {
      productName: "Samsung Galaxy S10",
      price: 800,
      rating: 3.5,
      discount: 20,
      availability: "In Stock",
    },
    {
      productName: "Samsung Galaxy S9",
      price: 700,
      rating: 3.0,
      discount: 25,
      availability: "Out of Stock",
    },
    {
      productName: "Samsung Galaxy S8",
      price: 600,
      rating: 2.5,
      discount: 30,
      availability: "In Stock",
    },
  ];
  return (
    <div className="m-5 flex flex-col gap-5">
      <FindProduct />
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
