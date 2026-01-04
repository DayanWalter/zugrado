import { FetchData } from "@/components/fetch-data";
import { ModeToggle } from "@/components/theme-toggle";
import { ZustandDemo } from "@/components/zustand-demo";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col gap-8 bg-white px-16 py-32 dark:bg-black">
        <div className="flex w-full items-start justify-between">
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="mb-4 text-2xl font-bold">
                GraphQL + Zustand Demo
              </h1>
              <p className="text-muted-foreground text-sm">
                Demonstrating GraphQL data fetching with Apollo Client and state
                management with Zustand
              </p>
            </div>
            <FetchData />
          </div>
          <ModeToggle />
        </div>
        <ZustandDemo />
      </main>
    </div>
  );
}
