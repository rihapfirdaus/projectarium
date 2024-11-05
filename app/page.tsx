import PostCard from "@/components/card/PostCard";
import FormPost from "@/components/form/FormPost";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 overflow-y-clip max-h-screen">
      <FormPost />
      <div className="flex flex-col overflow-y-scroll gap-2">
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
}
