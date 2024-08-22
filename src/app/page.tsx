import CodeExample from "@/components/CodeExample";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 border-[--foreground-rgb] border-2 rounded-xl">
      <p>Homepage of experiments, trash, etc.</p>
      <button style={{ backgroundColor: "#111111", color: "#f5f5f5", padding: "8px 12px", borderRadius: "6px" }}>
        Click me
      </button>
      <CodeExample />
    </main>
  );
}
