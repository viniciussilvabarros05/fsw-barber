"use client"

import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import {signIn} from 'next-auth/react'
const Header = () => {
  const handleLoginClick = async ()=>{
    await signIn()
  }
  return (
    <Card>
      <CardContent className="p-5 justify-between flex items-center">
        <Image src={"/logo.png"} alt={"FSW Barber"} width={120} height={22} />
        <Button variant="outline" size="icon" className="w-8 h-8" onClick={handleLoginClick}>
          <MenuIcon size={18} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
