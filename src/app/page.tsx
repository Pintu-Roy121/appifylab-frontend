import ProtectedRoute from "@/component/protectedRoute/protectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <main className="">
        <p>Hello</p>
      </main>
    </ProtectedRoute>
  );
}
