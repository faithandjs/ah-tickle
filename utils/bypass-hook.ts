"use server";
export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);

    if (response.ok && response.body) {
      const responseBody = await response.arrayBuffer();
      const body = Buffer.from(responseBody).toString("base64");
      return { body, ok: response.ok };
    }
  } catch (error) {
    return { ok: false };
  }
};
