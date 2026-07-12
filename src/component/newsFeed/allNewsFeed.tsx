import { Post } from "@/interfaces/interface";
import axios from "axios";
import { cookies } from "next/headers";
import { PostCard } from "./postCard";

async function getPosts() {
  const token = (await cookies()).get("token")?.value;
  const url = process.env.NEXT_PUBLIC_SERVER_API_URL + "/api/v1/post";
  const response = await axios({
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      cache: "no-store",
    },
  });
  if (!response?.data.success) throw new Error("Failed to load posts");
  return response.data ?? {};
}

const AllNewsFeed = async () => {
  const { data: posts } = await getPosts();
  return (
    <div className="flex flex-col gap-5">
      {posts?.data.map((post: Post) => (
        <div key={post._id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default AllNewsFeed;
