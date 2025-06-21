'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {NavigationMenu,NavigationMenuItem,navigationMenuTriggerStyle,NavigationMenuTrigger,NavigationMenuLink,NavigationMenuContent,NavigationMenuList} from '@/components/ui/navigation-menu';

export default function Navbar() {
    const pathname = usePathname();
    const config_menu_data = [
        {'label':'Primary Category','href':'/primary-category'},
        {'label':'Secondary Category','href':'/secondary-category'},
    ];
    const menu_data = [
        {
            'menu_label':"Transaction",'sub_menu_items':[
                {'label':'Record a new Transaction','href':'/add-transaction'},
                {'label':'View Transactions Table','href':'/view-transactions'}
            ]
        },
        {
            'menu_label':"Configuration",'sub_menu_items':[
                {'label':'Primary Category','href':'/primary-category'},
                {'label':'Secondary Category','href':'/secondary-category'},
            ]
        },
        
        
    ];
    return(
        <div className='bg-teal-500'>
            <NavigationMenu viewport={false} className="  px-6 py-3  relative  items-center justify-between">
                <NavigationMenuList>
                    <NavigationMenuItem key="app_name">
                        <div className="text-xl font-bold cursor-default select-none">
                            Where I Spend ?
                        </div>
                    </NavigationMenuItem>
                    <NavigationMenuItem key="home">
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link className='bg-teal-500' href={'/'}>Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    {menu_data.map((item)=>(
                        <NavigationMenuItem key={item.menu_label}>
                        <NavigationMenuTrigger className='bg-teal-500' >{item.menu_label}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-2 ">
                                {item.sub_menu_items.map((sitem)=>(
                                    <li key={sitem.label}>
                                        <NavigationMenuLink asChild>
                                            <Link href={sitem.href}>{sitem.label}</Link>
                                        </NavigationMenuLink>
                                    </li>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
        </NavigationMenu>
        </div>
        
    )
}