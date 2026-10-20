import { redirect } from "next/navigation";
import { AdminApp } from "@/components/admin/admin-app";
import { isAdminAuthenticated } from "@/lib/admin-auth";


export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
  return <AdminApp />;
}
