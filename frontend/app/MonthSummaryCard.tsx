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
        <Card className="bg-teal-200 w-[350px] ">
            <CardHeader>
                <CardTitle>
                    <div className="text-xl text-blue-500">
                        {data?.month} {data?.year}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-[170px_100px] gap-2 text-blue-800">
                    <div className="flex justify-start font-bold">No. of Transactions:</div>
                    <div className="flex justify-end">{data?.total_num_transactions}</div>
                    <div className="flex justify-start font-bold">Total amount spent:</div>
                    <div className="flex justify-end">AUD {data?.total_spent}</div>
                    <div className="flex justify-start font-bold">Avg. daily spent:</div>
                    <div className="flex justify-end">AUD {data?.avg_daily_spent}</div>
                </div>
            </CardContent>
        </Card>
    )
}