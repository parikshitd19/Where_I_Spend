'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { cn } from "@/lib/utils";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { format } from "date-fns";
import { PrimaryCategory,SecondaryCategory } from '@/types';
import { createTransaction, getPrimaryCategories,getSecondaryCategories } from '@/lib/api';
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,} from "@/components/ui/select";



export default function InputTransactionForm(){
    const [primaryCategoryData, setPrimaryCategoryData] = useState<PrimaryCategory[]>([]);
    
    const [secondaryCatData,setSecondaryCatData] = useState<SecondaryCategory[]>([]);
    const [secondaryCatDataDispaly,setSecondaryCatDataDisplay] = useState<SecondaryCategory[]>([]);
    
    const [isPrimaryChosen,setIsPrimaryChosen] = useState(false);
    const [isSecondaryChosen,setIsSecondaryChosen] = useState(false);

    const [resetPKey, setResetPKey] = useState(0);
    const [resetSKey, setResetSKey] = useState(1);
    
    useEffect(() => {
        loadPrimaryData();
        loadSecondaryData();
        }, []);

    const loadPrimaryData = async () =>{
        const result = await getPrimaryCategories();
        setPrimaryCategoryData(result)
    }
    const loadSecondaryData = async () =>{
        var result = await getSecondaryCategories();
        setSecondaryCatData(result)
    }
    
    const transactionFormSchema = z.object({
        amount:z.number().gt(0),
        place:z.string(),
        details:z.string(),
        primary_category_id: z.number({ required_error: "Select a primary category" }),
        secondary_category_id: z.number({ required_error: "Select a secondary category" }),
        transaction_date:z.date({
            required_error: "A transaction date is required.",
        }),
    })
    const form = useForm<z.infer<typeof transactionFormSchema>>({
        resolver: zodResolver(transactionFormSchema),
        defaultValues: {
            amount:0.0,
            place:'',
            details:'',
            primary_category_id:undefined,
            secondary_category_id:undefined,
            transaction_date:new Date()
        },
  })
  const onSubmit = async(values: z.infer<typeof transactionFormSchema>) => {
    try {
        const payload = {
        ...values,
        transaction_date: values.transaction_date.toISOString().split("T")[0],
        };
        const transaction_result = await createTransaction(payload);
        console.log(transaction_result);
        toast.success("Transaction successfully added");
        
        // Reset form after successful submission
        form.reset({
            amount: 0.0,
            place: '',
            details: '',
            primary_category_id: -1,
            secondary_category_id: -1,
            transaction_date: new Date(),
        });

        setIsPrimaryChosen(false);
        setIsSecondaryChosen(false);
        setSecondaryCatDataDisplay([]);
        setResetPKey(prev => prev + 1); 
        setResetSKey(prev => prev + 1);


    } catch (err) {
        console.error("Failed to create transaction:", err);
    }
  }
    return (
        
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className='grid grid-cols-3 gap-4'>
                        <div>
                            <FormField  control={form.control} name="primary_category_id" render={({field})=>(
                                <FormItem>
                                    <FormLabel>Primary Category</FormLabel>
                                    <FormControl>
                                        <Select key={resetPKey} required={true} onValueChange={(value)=>{
                                            const id = parseInt(value);
                                            field.onChange(id);
                                            const filtered = secondaryCatData.filter(item => item.primary_category_id === id);
                                            setSecondaryCatDataDisplay(filtered);
                                            setIsPrimaryChosen(filtered.length > 0);
                                            form.setValue("secondary_category_id", undefined); // Reset dependent select
                                            setIsSecondaryChosen(false);
                                            
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
                                    </FormControl>
                                    <FormDescription>
                                        Select a Primary category
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        </div>
                        <div>
                            <FormField control={form.control} name="secondary_category_id" render={({field})=>(
                                <FormItem>
                                    <FormLabel>Secondary Category</FormLabel>
                                    <FormControl>
                                        <Select key={resetSKey} required={true} onValueChange={(value)=>{
                                            field.onChange(parseInt(value));
                                            setIsSecondaryChosen(true);
                                        }} disabled={!isPrimaryChosen}>
                                            <SelectTrigger className="border p-2 rounded w-64">
                                                <SelectValue placeholder="Select the Secondary Catgegory" />
                                            </SelectTrigger>
                                            <SelectContent className="border p-2 rounded w-64">
                                                <SelectGroup>
                                                    <SelectLabel>Secondary Category</SelectLabel>
                                                    {secondaryCatDataDispaly.map((item) => (
                                                        <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        Select a Secondary category
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-4'>
                        <div>
                            <FormField control={form.control} name='amount' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input required={true} disabled={!isSecondaryChosen} className="w-[240px]" type="number" step="0.01"
                                            placeholder="Amount"  {...field} 
                                            onChange={(e) => field.onChange(Number(e.target.value))}/>
                                        </FormControl>
                                        <FormDescription>
                                            Amount spent in a transaction.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                        </div>
                        <div>
                            <FormField control={form.control} name='transaction_date'
                                render={({field}) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Transaction date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button disabled={!isSecondaryChosen} variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}>
                                                        {field.value ? (format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar 
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01") 
                                                    }
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            The date of transaction
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                        </div>
                        <div>
                            <FormField control={form.control} name='place' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Place of Transaction</FormLabel>
                                        <FormControl>
                                            <Input disabled={!isSecondaryChosen} className="w-[300px]" placeholder="Place"  {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        Place the amount was spent
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>  
                        </div>
                        <div>
                            <FormField control={form.control} name='details' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Details</FormLabel>
                                        <FormControl>
                                            <Input disabled={!isSecondaryChosen} className="w-[400px]" placeholder="Details"  {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        Details about the Transaction
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                        </div>
                    </div>
                <Button disabled={!isSecondaryChosen} type="submit">Submit</Button>
                </form>
            </Form>
        
    )
}