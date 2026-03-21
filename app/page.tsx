import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LandingPage from "@/components/LandingPage";

export default async function Home() {
  const session = await getServerSession();
  if (session) redirect("/jobs-search");
  return <LandingPage />;
}
