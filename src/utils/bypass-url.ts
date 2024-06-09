import { fixEncoding } from ".";

const getMetadata = async (url: string) => {
  const response = await fetch("/api/bypass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
    }),
  });
  const { body, ok } = await response.json();

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
      temp.querySelector('meta[name="description"]')?.getAttribute("content") ||
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
    return {
      title: fixEncoding(title),
      image: {
        url: image,
        alt: fixEncoding(title),
      },
      url,
      reading_time,
      description: fixEncoding(description),
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
    };
  } else {
    return {};
  }
};

export default getMetadata;
