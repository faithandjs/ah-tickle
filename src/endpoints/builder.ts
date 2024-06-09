import { createBuilder } from "@ibnlanre/builder";
import getMetadata from "@/utils/bypass-url";

export const builder = createBuilder(
  {
    metadata: (url: string) => getMetadata(url),
  },
  ["ah-tickle"]
);
