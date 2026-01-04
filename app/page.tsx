import { FetchData } from "@/components/fetch-data";
import { ModeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col bg-white px-16 py-32 dark:bg-black">
        <div className="flex w-full items-start justify-between">
          <div className="flex-1">
            <FetchData />
          </div>
          <ModeToggle />
        </div>
      </main>
    </div>
  );
}
