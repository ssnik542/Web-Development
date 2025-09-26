"use client";

import { IEvent } from "@/lib/database/models/event.model";
// import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";
import { useUser } from "@/lib/context/userContext";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          {!user ? (
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          ) : (
            <Checkout event={event} userId={user._id} />
          )}
          {/* <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">
                Get Tickets
              </Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn> */}
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
