"use client"

import { DarkButton } from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";

interface Zap {
    "id": string,
    "triggerId": string,
    "userId": number,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string
            "image": string
        }
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string,
            "image": string
        }
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(res => {
                setZaps(res.data.zaps);
                setLoading(false)
            })
    }, []);

    return {
        loading, zaps
    }
}

export default function() {
    const { loading, zaps } = useZaps();
    const router = useRouter();
    
    return <div>
        <div className="flex border-b justify-between p-4">
        <div className="flex justify-center pl-4 text-3xl font-extrabold">
        zapier
    <span className="text-orange-600">_</span>
  </div>
  <div className="flex">
  <div className="pr-4">
               <DarkButton onClick={() => {
                        router.push("/zap/create");
                    }}>Create</DarkButton>
                  </div>
                  <div  className="pr-4">
                <PrimaryButton onClick={() => {
                    router.push("/login")
                }}>Logout</PrimaryButton>
                </div>
                </div>
  </div>
        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg	 w-full">
                <div className="flex justify-between pr-8 ">
                    <div className="text-2xl font-bold">
                        My Zaps
                    </div>
                  
                </div>
            </div>
        </div>
        {loading ? <Loader /> : <div className="flex justify-center"> <ZapTable zaps={zaps} /> </div>}
    </div>
}

function ZapTable({ zaps }: {zaps: Zap[]}) {
    const router = useRouter();

    return <div className="p-8 max-w-screen-lg w-full">
        <div className="flex justify-center">
                <div className="flex-1">Name</div>
                <div className="flex-1">ID</div>
                <div className="flex-1">Webhook URL</div>
        </div>
        {zaps.map(z => <div className="flex border-b border-t justify-center py-4">
            <div className="flex-1 flex"><img src={z.trigger.type.image} className="w-[30px] h-[30px] mr-2" /> {z.actions.map(x => <img src={x.type.image} className="w-[30px] h-[30px] mr-2" />)}</div>
            <div className="flex-1 ">{z.id}</div>
            <div className="flex-1">{`${HOOKS_URL}/hooks/catch/1/${z.id}`}</div>
        </div>)}
    </div>
}