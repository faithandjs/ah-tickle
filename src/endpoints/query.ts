import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { builder } from "./builder";

export function useGetMetadata(url: string) {
  return useQuery({
    queryKey: builder.metadata.get(url),
    queryFn: () => builder.use().metadata(url),
  });
}
