import AllNewsFeed from "../newFeed/allNewsFeed";
import FeedSlider from "../newFeed/feedSlider";
import PostSection from "../newFeed/postSection";

const FeedSection = () => {
  return (
    <div
      id="feed-section"
      className="col-span-6 flex flex-col gap-5 max-h-screen overflow-y-scroll scrollbar-none pt-5"
    >
      <FeedSlider />
      <PostSection />
      <AllNewsFeed />
    </div>
  );
};

export default FeedSection;
