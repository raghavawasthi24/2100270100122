"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Table = {
  productName: string;
  price: number;
  rating: number;
  discount: number;
  availability: string;
};

export const columns: ColumnDef<Table>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "availability",
    header: "Availability",
  }

];
