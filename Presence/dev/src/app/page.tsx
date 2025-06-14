"use client";
import { UserContext } from "@/components/context/Usercontext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
interface LoginInterface {
  email: string;
  mdp: string;
}

interface userInterface {
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

export default function page() {
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const [data, setdata] = useState<LoginInterface>({ email: "", mdp: "" });
  const handleData = (e: ChangeEvent<HTMLInputElement>) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:3000/api/authentification/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      const result = await response.json();
      setUser(result as userInterface);
      localStorage.setItem("user", JSON.stringify(result));
      router.push("/home");
    }
  };


  return (
    <div className="w-[500px] h-[600px] border-gray border-2 shadow-md mx-auto mt-10 rounded-2xl">
      <h1 className="text-center mt-10 text-3xl text-red-500 mb-20">Login</h1>
      <form onSubmit={handleSubmit}>
        <Label className="ml-16 text-md mb-2">Email</Label>
        <Input
          className="w-3/4 mx-auto"
          placeholder="Enter your email here"
          type="email"
          name="email"
          onChange={handleData}
          required
        ></Input>
        <Label className="ml-16 text-md mb-2 mt-10">Password</Label>
        <Input
          className="w-3/4 mx-auto mb-20"
          placeholder="Enter your password here"
          type="password"
          name="mdp"
          onChange={handleData}
          required
        ></Input>
        <Button className="ml-16 w-3/4" type="submit">
          Login
        </Button>
        <br></br>
        <Link href={"/signup"}>
          <Button className="mt-4 ml-16 w-3/4" variant={"outline"}>
            Sign up
          </Button>
        </Link>
      </form>
    </div>
  );
}
