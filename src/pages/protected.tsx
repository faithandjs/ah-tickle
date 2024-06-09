import AuthButton from "@/components/ui/AuthButton";
// import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import { redirect } from "next/navigation";
import { Layout } from "@/components";

export default function ProtectedPage() {
  // const supabase = createClient();
  //  const data = await response.json();

  // const {
  //   data: { user },
  // } = await supabase.json.auth.getUser();

  // if (!user) {
  //   return redirect("/login");
  // }

  return (
    <Layout>
      <div className="flex-1 w-full flex flex-col gap-20 items-center bg-background">
        <div className="w-full">
          <div className="py-6 font-bold bg-purple-950 text-center">
            This is a protected page that you can only see as an authenticated
            user
          </div>
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
              {/* <AuthButton /> */}
            </div>
          </nav>
        </div>

        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
          <main className="flex-1 flex flex-col gap-6">
            <h2 className="font-bold text-4xl mb-4">Next steps</h2>
            <FetchDataSteps />
          </main>
        </div>

        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>
            Powered by
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
        </footer>
      </div>
    </Layout>
  );
}
