import { createClient } from "@/utils/supabase/static-props";

export default function PublicPage({ data }: { data?: any[] }) {
  console.log(data);
  return <pre>{data && JSON.stringify(data, null, 2)} hello</pre>;
}

export async function getStaticProps() {
  const supabase = createClient();

  const { data, error } = await supabase.from("notes").select();

  if (error || !data) {
    return { props: {} };
  }

  return { props: { data } };
}
