"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/context/userContext";
import { Mail, LockKeyhole, User } from "lucide-react";

function page() {
  const form = useForm();
  const router = useRouter();
  const { setUser } = useUser();
  async function onSubmit(values: any) {
    try {
      const data = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const user = await data.json();
      setUser(user);
      form.reset();
      router.push(`/`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="border border-black p-10 rounded-lg ">
      <div className="pb-6 flex justify-center">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            width={128}
            height={38}
            alt="Evently logo"
          />
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 border border-black">
                      <User />
                      <Input
                        type="text"
                        placeholder="Username"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 border border-black">
                      <Mail />
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 border border-black">
                      <LockKeyhole />
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
          >
            Sign Up
          </Button>
        </form>
      </Form>
      <div className="pl-4 pt-4">
        Already have Account?{" "}
        <Link
          href="/sign-in"
          className="text-blue-600 cursor-pointer font-semibold"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default page;
