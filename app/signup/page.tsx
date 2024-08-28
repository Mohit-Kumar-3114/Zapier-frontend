"use client";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader"; 

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); 
    const [redirecting, setRedirecting] = useState(false); 
    const router = useRouter();

    const handleSignUp = async () => {
        setLoading(true); 
        try {
            await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                name,
                email,
                password,
            });
            setRedirecting(true);
        } catch (error) {
            console.error("Sign-up error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (redirecting) {
            router.push("/login");
        }
    }, [redirecting, router]);

    if (loading) {
        return <Loader />;
    }

    if (redirecting) {
        return null; 
    }

    return (
        <div>
            <div className="flex border-b justify-between p-4">
                <div className="flex justify-center pl-4 text-3xl font-extrabold">
                    zapier
                    <span className="text-orange-600">_</span>
                </div>
                <div className="pr-4">
                    <PrimaryButton onClick={() => router.push("/login")}>
                        Login
                    </PrimaryButton>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex pt-8 max-w-4xl">
                    <div className="flex-1 mr-20 pt-20 px-4">
                        <div className="font-semibold text-3xl pb-4">
                            Join millions worldwide who automate their work using Zapier.
                        </div>
                        <div className="pb-6 pt-4">
                            <CheckFeature label={"Easy setup, no coding required"} />
                        </div>
                        <div className="pb-6">
                            <CheckFeature label={"Free forever for core features"} />
                        </div>
                        <CheckFeature label={"Automate your workflows in minutes"} />
                    </div>
                    <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
                        <Input onChange={e => setName(e.target.value)} label={"Name"} type="text" placeholder="Your Name" />
                        <Input onChange={e => setEmail(e.target.value)} label={"Email"} type="text" placeholder="Your Email" />
                        <Input onChange={e => setPassword(e.target.value)} label={"Password"} type="password" placeholder="Password" />
                        <div className="pt-4">
                            <PrimaryButton onClick={handleSignUp} size="big">Sign Up</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
