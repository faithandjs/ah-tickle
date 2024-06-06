import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const cors = require("cors");
const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(cors()).post(async (req, res) => {
  const { url, config } = req.body;

  try {
    const response = await fetch(url, config);
    console.log(response);

    if (response.ok && response.body) {
      const responseBody = await response.arrayBuffer();
      const body = Buffer.from(responseBody).toString("base64");
      res.status(response.status).json({ body, ok: response.ok });
    }
  } catch (error) {
    res.status(500).json({ body: "", ok: false, error });
  }
});

export default router.handler();
