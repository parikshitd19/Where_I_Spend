'use client';
import React, { useEffect, useState } from 'react';
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table';
import { PrimaryCategory, SecondaryCategory, UpdateSecondaryCategory } from '@/types';
import { createSecondaryCategory, deleteSecondaryCategory, getPrimaryCategories, getSecondaryCategories, updateSecondaryCategory } from '@/lib/api';
import {Input} from "@/components/ui/input" ;
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { devNull } from 'node:os';

export default function SecondaryCategoryTable() {
    const [data, setData] = useState<SecondaryCategory[]>([]);
    const [primaryCategoryData, setPrimaryCategoryData] = useState<PrimaryCategory[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newCategory, setNewCategory] = useState<Partial<SecondaryCategory>>({});

    useEffect(() => {
        loadData();
      }, []);
    
      const loadData = async () => {
        const result = await getSecondaryCategories();
        const pc_result = await getPrimaryCategories();
        setData(result);
        setPrimaryCategoryData(pc_result)
      };

      const handleUpdate = async (id: number, updated: UpdateSecondaryCategory) => {
          await updateSecondaryCategory(id, updated);
          await loadData();
          setEditingId(null);
        };
      
        const handleDelete = async (id: number) => {
          await deleteSecondaryCategory(id);
          await loadData();
        };
      
        const handleCreate = async () => {
          if (!newCategory.name) return;
          console.log(newCategory);
          await createSecondaryCategory(newCategory);
          setNewCategory({});
          await loadData();
        };
        const columns: ColumnDef<SecondaryCategory>[] = [
            {
                header: 'ID',
                accessorKey: 'id',
                cell: info => info.getValue(),
            },
            {
                header: 'Name',
                accessorKey: 'name',
                cell: info => {
                const row = info.row.original;
                if (editingId === row.id) {
                    return (
                    <Input
                        className="border p-1 rounded"
                        defaultValue={row.name}
                        onChange={e => (row.name = e.target.value)}
                    />
                    );
                }
                return row.name;
                },
            },
            {
                  header: 'Description',
                  accessorKey: 'description',
                  cell: info => {
                    const row = info.row.original;
                    if (editingId === row.id) {
                      return (
                        <Input
                          className="border p-1 rounded"
                          defaultValue={row.description}
                          onChange={e => (row.description = e.target.value)}
                        />
                      );
                    }
                    return row.description;
                },
            },
            {
                  header: 'Primary Category',
                  accessorKey: 'primary_category_id',
                  cell: info => {
                    const row = info.row.original;
                    if (editingId === row.id) {
                      return (
                        <Select defaultValue={String(row.primary_category_id)} onValueChange={(value)=>{
                           row.primary_category_id = parseInt(value)
                        }}>
                            <SelectTrigger className="border p-2 rounded w-64">
                                <SelectValue placeholder="Select the Primary Catgegory" />
                            </SelectTrigger>
                            <SelectContent className="border p-2 rounded w-64">
                                <SelectGroup>
                                    <SelectLabel>Primary Category</SelectLabel>
                                    {primaryCategoryData.map((item) => (
                                        <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                      );
                    }
                    return row.primary_category?.name;
                },
            },
            {
                header: 'Actions',
                cell: info => {
                const row = info.row.original;
                return editingId === row.id ? (
                    <div className="flex gap-2">
                    <Button
                        className="px-2 py-1 bg-green-500 text-white rounded"
                        onClick={() =>
                        handleUpdate(row.id, {
                            name: row.name,
                            description: row.description,
                            primary_category_id: row.primary_category_id
                        })
                        }
                    >
                        Save
                    </Button>
                    <Button
                        className="px-2 py-1 bg-gray-400 text-white rounded"
                        onClick={() => setEditingId(null)}
                    >
                        Cancel
                    </Button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                    <Button
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                        onClick={() => setEditingId(row.id)}
                    >
                        Edit
                    </Button>
                    <Button
                        className="px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDelete(row.id)}
                    >
                        Delete
                    </Button>
                    </div>
                );
                },
            },
        ]
     const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Add new Secondary Category</h2>

            <div className="flex gap-2 mb-4">
                <Input
                    className="border p-2 rounded w-64"
                    placeholder="Name"
                    value={newCategory.name || ''}
                    onChange={e =>
                        setNewCategory({ ...newCategory, name: e.target.value })
                    }
                />
                <Input
                    className="border p-2 rounded w-64"
                    placeholder="Description"
                    value={newCategory.description || ''}
                    onChange={e =>
                        setNewCategory({ ...newCategory, description: e.target.value })
                    }
                />
                <Select  onValueChange={(value)=>{
                    setNewCategory({ ...newCategory, primary_category_id: parseInt(value) })
                }}>
                    <SelectTrigger className="border p-2 rounded w-64">
                        <SelectValue placeholder="Select the Primary Catgegory" />
                    </SelectTrigger>
                    <SelectContent className="border p-2 rounded w-64">
                        <SelectGroup>
                            <SelectLabel>Primary Category</SelectLabel>
                            {primaryCategoryData.map((item) => (
                                <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleCreate}>
                Add
                </Button>
            </div>
            <table className="min-w-full border rounded">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="bg-gray-200">
                        {headerGroup.headers.map(header => (
                        <th key={header.id} className="p-2 text-left border-b">
                            {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                        </th>
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
        </div>
    );
}