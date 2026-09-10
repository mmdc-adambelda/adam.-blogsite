import { notFound } from "next/navigation";
import { getPostById } from "@/lib/posts";
import PostEditor from "@/app/admin/PostEditor";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const post = Number.isInteger(id) ? await getPostById(id) : null;
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-night px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 font-display text-3xl text-cream">Edit post</h1>
        <PostEditor post={post} />
      </div>
    </main>
  );
}
