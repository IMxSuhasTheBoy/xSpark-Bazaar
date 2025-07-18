"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { ReviewSidebar } from "../components/review-sidebar";

interface Props {
  productId: string;
}

export const ProductView = ({ productId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.library.getOne.queryOptions({ productId }),
  );

  return (
    <div className="min-h-screen bg-white">
      <nav className="w-full border-b bg-[#F4F4F0] p-4">
        <Link prefetch href="/library" className="flex items-center gap-2">
          <ArrowLeftIcon className="size-4" />
          <span className="text font-medium">Back to Library</span>
        </Link>
      </nav>
      <header className="border-b bg-[#F4F4F0] py-8">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-12">
          <h1 className="text-[40px] font-medium">{data.name}</h1>
        </div>
      </header>
      <section className="mx-auto max-w-(--breakpoint-xl) px-4 py-10 lg:px-12">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="gap-4 rounded-md border bg-white p-4">
              <ReviewSidebar productId={productId} />
            </div>
          </div>

          <div className="lg:col-span-5">
            {data.content ? (
              <p> {data.content}</p>
            ) : (
              <p className="text-muted-foreground font-medium italic">
                No specific content
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
