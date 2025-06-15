"use client"

import { useEffect } from "react"
import {Crisp} from "crisp-sdk-web"

export const CrispChat=()=>{
    useEffect(()=>{
        Crisp.configure("f5043d60-3eaf-4b9b-9902-822e2f70c1e5")
    }, [])

    return null;
}