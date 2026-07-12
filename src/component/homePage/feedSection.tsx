import AllNewsFeed from "../newsFeed/allNewsFeed";
import FeedSlider from "../newsFeed/feedSlider";
import PostSection from "../newsFeed/postSection";

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
