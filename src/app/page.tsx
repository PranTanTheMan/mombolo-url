import getUserSession from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import UrlShortnerForm from "@/components/urlshortnerform";
import UrlList from "@/components/listurls";

export default async function Home() {
  const {
    data: { session },
  } = await getUserSession();

  if (!session) {
    return redirect("/login");
  }

  const user = session.user;

  return (
    <>
      <section className="h-full mb-32">
        <div className="w-full flex flex-col justify-center items-center pt-12">
          <p className="mb-3 text-5xl text-center font-semibold">
            Welcome {user.user_metadata.full_name}
          </p>
        </div>

        <UrlShortnerForm />

        <UrlList />
      </section>
    </>
  );
}
