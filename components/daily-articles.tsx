"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";
import { fetchData } from "@/utils/bypass-hook";
import { fixEncoding } from "@/utils";

export function DailyArticles() {
  const [article, setArticle] = useState<Record<string, any>>({
    ok: false,
  });

  const getMeta = async (url: string) => {
    const reponse = await fetchData(url);
    const { ok, body } = reponse!;

    if (ok && body) {
      const decodedBody = atob(body);
      const temp = document.createElement("div");
      temp.innerHTML = decodedBody;
      // console.log(temp);

      const title = temp.querySelector("title")?.innerText;
      const site_name = temp
        .querySelector('meta[property="og:site_name"]')
        ?.getAttribute("content");
      const image = temp
        .querySelector('meta[property="og:image"]')
        ?.getAttribute("content");
      const author = temp
        .querySelector('meta[name="author"]')
        ?.getAttribute("content");
      const reading_time = temp
        .querySelector('meta[name="twitter:data1"]')
        ?.getAttribute("content");

      const twitter = temp
        .querySelector('meta[name="twitter:creator"]')
        ?.getAttribute("content");

      const description =
        temp
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") ||
        temp
          .querySelector('meta[property="og:description"]')
          ?.getAttribute("content");

      const logo_base =
        temp.querySelector('link[rel="apple-touch-icon"]') ||
        temp.querySelector('link[rel="icon"]') ||
        temp.querySelector('link[rel="mask-icon"]');

      const logo_url =
        logo_base?.getAttribute("href") ??
        `https://www.google.com/s2/favicons?domain=${url}&sz=256`;

      const isUrl = logo_url.match(
        /^(https?:\/\/(www\.)?|www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/
      );
      // console.log({
      //   title,
      //   reading_time,
      //   logo_url,
      //   site_name,
      //   description,
      //   author,
      //   image,
      //   twitter,
      // });
      setArticle({
        ok,
        title: fixEncoding(title),
        image: {
          url: image,
          alt: fixEncoding(title),
        },
        url,
        reading_time,
        description,
        app: {
          site_name,
          logo_url,
        },
        author: {
          name: fixEncoding(author),
          image: "",
          socials: [
            {
              active: !!twitter,
              sm: "x.com",
              handle: '"social.com"',
            },
          ],
        },
      });
    } else {
      // console.log("error");
      return {};
    }
  };
  useEffect(() => {
    getMeta("https://medium.com/@Sommiewrites/pleasure-1f0f9472e5fc");

    // getMeta();
    // https://cors-anywhere.herokuapp.com/
  }, []);

  return (
    <div className="w-[30rem] ">
      {article.ok ? (
        <>
          <div
            className="flex justify-center border-x border-t border-gray-400 hover:cursor-pointer"
            onClick={() => {
              console.log(article);
              // redirect(feedback.url, RedirectType.push);
            }}
          >
            <div className="h-[20rem] w-full relative self-center">
              <Image
                // src={newspaper}
                src={article.image.url}
                fill
                className="italic"
                alt={article.image.alt}
                onError={(e) => {
                  e.currentTarget.src = "/newspaper.png";
                  e.currentTarget.alt = "newspaper";
                  e.currentTarget.className = "";
                }}
              />
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-xl">{article?.title ?? ""}</h2>
            <p className="text-base italic">
              <span className="italic">{article.description}</span> -&nbsp;
              <Link
                // href={feedback.author.social}
                href={""}
                className="font-semibold"
                target="_blank"
              >
                {article?.author.name ?? ""}
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
