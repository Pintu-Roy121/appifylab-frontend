import FeedSection from "@/component/homePage/feedSection";
import LeftSidebar from "@/component/homePage/leftSidebar";
import RightSidebar from "@/component/homePage/rightSidebar";
import NavBar from "@/component/navbar/navbar";
import ProtectedRoute from "@/component/protectedRoute/protectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <main className="bg-gray-200">
        <NavBar />
        <div className="w-full flex justify-center mt-18">
          <div className="w-5/6 flex justify-center">
            <div className="grid grid-cols-12 w-full gap-5">
              <LeftSidebar />
              <FeedSection />
              <RightSidebar />
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
