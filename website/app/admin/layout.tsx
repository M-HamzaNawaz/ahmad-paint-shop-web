import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/admin/Sidebar";
import { QueryProvider } from "@/components/admin/QueryProvider";

export const metadata = { title: "Admin" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Unauthenticated visitors land on /admin/login — render it standalone
  // (login page provides its own layout). Middleware blocks any other
  // /admin/* route for unauthenticated users.
  if (!user) return <>{children}</>;

  return (
    <QueryProvider>
      <div className="min-h-screen bg-zinc-50">
        <Sidebar email={user.email ?? ""} />
        <div className="lg:pl-64">
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </QueryProvider>
  );
}
