import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useGetMetadata } from "@/endpoints/query";

export function DailyArticles() {
  const { data, status } = useGetMetadata(
    "https://medium.com/@Sommiewrites/pleasure-1f0f9472e5fc"
  );

  console.log(data, status);

  return (
    <div className="w-[30rem] ">
      {status === "success" ? (
        <>
          <div
            className="flex justify-center border-x border-t border-gray-400 hover:cursor-pointer"
            onClick={() => {
              console.log(data);
              // redirect(feedback.url, RedirectType.push);
            }}
          >
            <div className="h-[20rem] w-full relative self-center">
              <Image
                // src={newspaper}
                src={data?.image!.url!}
                fill
                className="italic"
                alt={data?.image!.alt}
                onError={(e) => {
                  e.currentTarget.src = "/newspaper.png";
                  e.currentTarget.alt = "newspaper";
                  e.currentTarget.className = "";
                }}
              />
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-xl">{data?.title ?? ""}</h2>
            <p className="text-base italic">
              <span className="italic">{data?.description}</span> -&nbsp;
              <Link
                // href={feedback.author.social}
                href={""}
                className="font-semibold"
                target="_blank"
              >
                {data?.author?.name ?? ""}
              </Link>
            </p>
          </div>
        </>
      ) : (
        <>waiting...</>
      )}
    </div>
  );
}
