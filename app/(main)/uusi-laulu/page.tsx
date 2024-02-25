import BackButton from "@/components/BackButton";
import NewSongForm from "@/components/NewSongForm";
import Space from "@/components/ui/space";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const NewSongPage = async () => {
  const supabase = createServerClient();

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  return (
    <div>
      <BackButton />

      <Space className="mt-4" />

      <h1 className="text-xl font-semibold">Uusi laulu</h1>

      <Space className="mt-4" />

      <NewSongForm />
    </div>
  );
};

export default NewSongPage;
