import { BiPlus } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

const storiesData = [
  {
    id: "0",
    type: "yourStory",
    backgroundUrl:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400&q=80",
  },
  {
    id: "1",
    type: "story",
    backgroundUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
    name: "Ryan Roslansky",
    avatarUrl: "https://i.pravatar.cc/80?img=12",
  },
  {
    id: "2",
    type: "story",
    backgroundUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
    name: "Ryan Roslansky",
    avatarUrl: "https://i.pravatar.cc/80?img=12",
  },
  {
    id: "3",
    type: "story",
    backgroundUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",
    name: "Ryan Roslansky",
    avatarUrl: "https://i.pravatar.cc/80?img=12",
    showArrow: true,
  },
];

const FeedSlider = () => {
  return (
    <div className="">
      <div className="scrollbar-none flex gap-4 overflow-x-auto pb-2">
        {storiesData.map((item) => (
          <div
            key={item.id}
            className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl bg-slate-900"
          >
            <img
              src={item.backgroundUrl}
              alt={item.type === "yourStory" ? "Your story" : item.name}
              className={`h-full w-full object-cover ${
                item.type === "yourStory" ? "opacity-50" : "opacity-90"
              }`}
            />

            {/* bottom gradient for text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

            {item.type === "yourStory" ? (
              <>
                <button
                  type="button"
                  aria-label="Add to your story"
                  className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#4A6CF7] text-white shadow-md transition hover:bg-[#3B5CE0]"
                >
                  <BiPlus
                    className="h-5 w-5"
                    strokeWidth={2.5}
                  />
                </button>
                <p className="absolute bottom-3 left-0 right-0 text-center text-sm font-semibold text-white">
                  Your Story
                </p>
              </>
            ) : (
              <>
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  className="absolute right-2 top-2 h-9 w-9 rounded-full border-2 border-white object-cover"
                />
                <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white">
                  {item.name}
                </p>
                {item.showArrow && (
                  <button
                    type="button"
                    aria-label="Next story"
                    className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#4A6CF7] text-white transition hover:bg-[#3B5CE0]"
                  >
                    <BsArrowRight
                      className="h-3.5 w-3.5"
                      strokeWidth={2.5}
                    />
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedSlider;
