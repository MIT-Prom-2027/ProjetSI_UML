"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
interface SignupInterface {
  nom: string;
  prenom: string;
  email: string;
  mdp: string;
  role: string;
}

export default function page() {
  const router = useRouter();
  const rolelist = [
    { titre: "Etudiant" },
    { titre: "Enseignant" },
    { titre: "Delegue" },
  ];
  const [data, setdata] = useState<SignupInterface>({
    email: "",
    mdp: "",
    nom: "",
    prenom: "",
    role: "",
  });
  const [selectedrole, setselectedrole] = useState<string>();
  const handleData = (e: ChangeEvent<HTMLInputElement>) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/personne", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      router.push("/");
    }
  };

  useEffect(() => {
    setdata({ ...data, role: selectedrole as string });
  }, [selectedrole]);

  return (
    <div className="w-[500px] h-[650px] border-gray border-2 shadow-md mx-auto mt-10 rounded-2xl">
      <h1 className="text-center mt-10 text-3xl text-red-500 mb-10">Signup</h1>
      <form onSubmit={handleSubmit}>
        <Label className="ml-16 text-md mb-2">Nom</Label>
        <Input
          className="w-3/4 mx-auto"
          placeholder="Entrez votre nom ici"
          type="text"
          name="nom"
          onChange={handleData}
          required
        ></Input>
        <Label className="ml-16 text-md mb-2 mt-2">Prénom</Label>
        <Input
          className="w-3/4 mx-auto mb-2"
          placeholder="Entrez votre prénom here"
          type="text"
          name="prenom"
          onChange={handleData}
          required
        ></Input>
        <Label className="ml-16 text-md">Email</Label>
        <Input
          className="w-3/4 mx-auto mb-2"
          placeholder="Entrez votre email ici"
          type="email"
          name="email"
          onChange={handleData}
          required
        ></Input>
        <Label className="ml-16 text-md mb-2">Mot de passe</Label>
        <Input
          className="w-3/4 mx-auto mb-2"
          placeholder="Entrez votre mot de passe ici"
          type="password"
          name="mdp"
          onChange={handleData}
          required
        ></Input>
        <Label className="ml-16 mt-5 text-md">Role</Label>
        <Select
          onValueChange={(value) => setselectedrole(value)}
          defaultValue={selectedrole}
        >
          <SelectTrigger className="w-3/4 bg-white mt-2 mx-auto mb-5">
            <SelectValue placeholder="Sélectionnez une role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Role</SelectLabel>
              {rolelist?.map((item, index) => (
                <SelectItem value={item.titre} key={index}>
                  {item.titre}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className="ml-16 w-3/4" type="submit">
          Sign up
        </Button>
        <br></br>
        <Link href={"/"}>
          <Button className="mt-4 ml-16 w-3/4" variant={"outline"}>
            Go back
          </Button>
        </Link>
      </form>
    </div>
  );
}
