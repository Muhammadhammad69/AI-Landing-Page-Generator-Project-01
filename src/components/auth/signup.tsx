"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpData, signUpSchema } from "./authSchema";
import Link from "next/link";
export const SignUpComp = () => {
  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: SignUpData) => {
    console.log("values", values);
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign Up to your account</CardTitle>
        <CardDescription>
        Enter your email below to create a new account
        </CardDescription>
        <CardAction>
          <Link href="/login">
            <Button variant="link" className="cursor-pointer">Login</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <div className="px-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex-col gap-2 p-0">
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg  font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Sign Up
              </Button>
              {/* <Button variant="outline" className="w-full cursor-pointer ">
              Sign Up with Google
              </Button> */}
            </CardFooter>
          </form>
        </Form>
      </div>
    </Card>
  );
};
