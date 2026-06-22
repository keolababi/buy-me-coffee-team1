import Image from "next/image";
import { redirect } from "next/navigation";
import HomeDashboard from "./home-dashboard/page";

export default function Home() {
  redirect("/home-dashboard");
}
