"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLatestTransactions } from "@/lib/api";
import { Transaction } from "@/types";
import { useEffect, useState } from "react";

export default function LatestTransactionsSummary({transaction_count}){
    const [data,setData] = useState<Transaction[]>();
    const [tCount,setTCount] = useState(transaction_count);
    const loadData = async() =>{
        const result = await getLatestTransactions(tCount);
        setData(result);
        
    }
    useEffect(()=>{
        loadData();
    },[])
    console.log(data);
    return(
        <Card className="bg-teal-200">
            <CardHeader>
                <CardTitle>
                    <div className="text-xl text-blue-500">
                        Last {data?.length} Transactions
                    </div>
                </CardTitle>
            </CardHeader>
             <CardContent>
                <div key={'heading'} className="grid grid-cols-[100px_100px_100px] text-blue-800 font-bold">
                    <div>{'Date'}</div>
                    <div>{'Amount'}</div>
                    <div>{'Place'}</div>
                </div>
                {data?.map((item)=>(
                    <div key={item.id} className="grid grid-cols-[100px_100px_120px] text-blue-800 ">
                        <div>{new Date(item.transaction_date).toLocaleDateString()}</div>
                        <div className=" flex justify-start">AUD {item.amount}</div>
                        <div className=" truncate w-30">{item.place}</div>
                    </div>
                ))}
             </CardContent>
        </Card>
    )
}