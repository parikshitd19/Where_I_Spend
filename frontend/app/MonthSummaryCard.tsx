'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMonthSummaryData } from "@/lib/api";
import { MonthSummaryStats } from "@/types"
import { useEffect, useState } from "react"

export default function MonthSummaryCard(){
    const [data,setData] = useState<MonthSummaryStats>();
    const loadData = async() =>{
        const result = await getMonthSummaryData();
        setData(result);
    }
    useEffect(()=>{
        loadData();
    },[])
    
    
    console.log(data)

    return(
        <Card className="bg-teal-200 w-[300px] max-w-sm">
            <CardHeader>
                <CardTitle>{data?.month} {data?.year}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-[150px_100px] gap-2">
                    <div className="flex justify-start">Total amount spent:</div>
                    <div className="flex justify-end">AUD {data?.total_spent}</div>
                    <div className="flex justify-start">No. of Transactions:</div>
                    <div className="flex justify-end">{data?.total_num_transactions}</div>
                </div>
            </CardContent>
        </Card>
    )
}