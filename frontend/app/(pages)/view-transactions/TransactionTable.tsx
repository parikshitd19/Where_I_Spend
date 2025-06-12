'use client';

import { useEffect, useState } from "react";
import { Transaction } from "@/types";
import { getTransactions } from "@/lib/api";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import TableControlButtons from "@/components/TableControlButtons";

export default function TransactionTable(){
    const [data, setData] = useState<Transaction[]>([]);
    const [sorting, setSorting] = useState([{ id: 'transaction_date', desc: false }]); 
    
    useEffect(() => {
        loadData();
      }, []);
    
      const loadData = async () => {
        const result = await getTransactions();
        console.log(result[0]);
        setData(result);
      };
      const columns: ColumnDef<Transaction>[] = [
        // {
        //     header: 'ID',
        //     accessorKey: 'id',
        //     cell: info => info.getValue(),
        //     sortingFn: 'alphanumeric',
        //     sortDescFirst: false,
        // },
        {
            header: 'Date',
            accessorKey: 'transaction_date',
            cell: info => {
                const date = new Date(info.getValue() as string);
                return date.toLocaleDateString();
            },
            sortingFn: (rowA, rowB, columnId) => {
                const dateA = new Date(rowA.getValue(columnId));
                const dateB = new Date(rowB.getValue(columnId));
                return dateA.getTime() - dateB.getTime();
            },
            enableSorting: true,
            sortDescFirst: false,
        },
        {
            header: 'Amount',
            accessorKey: 'amount',
            cell: info => {
                return 'AUD '+info.getValue()
            },
            sortingFn: 'alphanumeric',
            sortDescFirst: false,
        },
        {
            header: 'Place',
            accessorKey: 'place',
            cell: info => info.getValue(),
            // sortingFn: 'alphanumeric',
            // sortDescFirst: false,
        },
        {
            header: 'Details',
            accessorKey: 'details',
            cell: info => info.getValue(),
            // sortingFn: 'alphanumeric',
            // sortDescFirst: false,
        },
        {
            header: 'Primary Category',
            accessorKey: 'primary_category.name',
            cell: info => info.getValue(),
            // sortingFn: 'alphanumeric',
            // sortDescFirst: false,
        },
        {
            header: 'Secondary Category',
            accessorKey: 'secondary_category.name',
            cell: info => info.getValue(),
            // sortingFn: 'alphanumeric',
            // sortDescFirst: false,
        },
    ]
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting },
        onSortingChange: setSorting,
        initialState: {
            pagination: {
            pageIndex: 0, //custom initial page index
            pageSize: 10, //custom default page size
            },
        },
      })
      return(
        <div>
             <table className="min-w-full border rounded">
                    <thead>
                      {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="bg-gray-200">
                          {headerGroup.headers.map(header => (
                            <th key={header.id} className="p-2 text-left border-b" onClick={() => header.column.toggleSorting()}>
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                                {header.column.getIsSorted() === 'asc' && ' 🔼'}
                                {header.column.getIsSorted() === 'desc' && ' 🔽'}
                            </th>
                            // <th key={header.id} className="p-2 text-left border-b">
                            //   {flexRender(
                            //     header.column.columnDef.header,
                            //     header.getContext()
                            //   )}
                            // </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="border-b">
                          {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="p-2">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
            </table>
            <br/>
            <TableControlButtons table={table}/>
        </div>

       
                  
    )
}