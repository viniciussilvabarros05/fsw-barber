"use client";

import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { signIn, useSession,signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";

const Header = () => {
  const { data } = useSession();
  const handleLoginClick = async () => {
    await signIn();
  };
  const handleLogoutClick = () => {
     return signOut();
  };
  return (
    <Card>
      <CardContent className="p-5 justify-between flex items-center flex-row">
        <Image src={"/logo.png"} alt={"FSW Barber"} width={120} height={22} />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="w-8 h-8">
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SheetHeader className="text-left border-b border-solid border-secondary p-5">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            {data?.user ? (
              <div className="flex items-center gap-3 px-5 py-6 justify-between">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={data.user?.image ?? ""} />
                  </Avatar>
                  <h2 className="font-bold">{data.user.name}</h2>
                </div>
                <Button onClick={handleLogoutClick} variant="secondary" size="icon">
                  <LogOutIcon />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col px-5 py-6 gap-3">
                <div className="flex items-center gap-2">
                  <UserIcon size={32} className=" border-solid border-[2px] rounded-[50rem] border-white"/>
                  <h2 className="font-bold">Olá, faça seu login!</h2>
                </div>
                <Button onClick={handleLoginClick} variant="secondary" className="w-full">
                  <LogInIcon className="mr-2 " size={18}/>
                  Fazer Login
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
