import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/route";
import { generateDateTimeId } from "@/utils/generateDateTimeId";


export default async function CataractRedirect() {
  const session = await getServerSession(options);

  console.log(session);

  const dateTimeId=generateDateTimeId();

  if (session && session.user && session.user.email) {
    const email = session.user.email;
    console.log(email);
    redirect(`/cholecystectomy/${email}/${dateTimeId}`);
  } else {
    redirect("/");
  }
}