import PostEditor from "@/app/admin/PostEditor";

export default function NewPostPage() {
  return (
    <main className="min-h-screen bg-night px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 font-display text-3xl text-cream">New post</h1>
        <PostEditor />
      </div>
    </main>
  );
}
