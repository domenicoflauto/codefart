import { Gallery } from "@/components/Gallery";

export default function Page() {
  return (
    <main className="flex flex-col md:flex-row items-center md:items-start justify-center h-full w-full gap-4">
      <Gallery />
    </main>
  )
}