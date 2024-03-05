"use client"

import { CalendarIcon, HomeIcon, LogOutIcon, UserIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";

const SideMenu = () => {
    const { data, status } = useSession();
    const handleLoginClick = async () => {
      await signIn("google");
    };
    const handleLogoutClick = () => {
      return signOut();
    };
  return (
    <>
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
            <UserIcon
              size={32}
              className=" border-solid border-[2px] rounded-[50rem] border-white"
            />
            <h2 className="font-bold">Olá, faça seu login!</h2>
          </div>
          <Button
            onClick={handleLoginClick}
            variant="secondary"
            className="w-full flex gap-4"
          >
            <Image src="/google.png" width={24} height={24} alt="google-icon" />
            Fazer Login com Google
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/">
            <HomeIcon size={18} className="mr-2" />
            Início
          </Link>
        </Button>

        {data?.user && (
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/agendamentos">
              <CalendarIcon size={18} className="mr-2" />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default SideMenu;
