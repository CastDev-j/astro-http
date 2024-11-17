import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, Posts } from "astro:db";
import { eq } from "astro:db";

export const updatePostLikes = defineAction({
  accept: "json",
  input: z.object({
    postId: z.string(),
    likes: z.number(),
  }),
  handler: async ({ likes, postId }) => {
    const posts = await db.select().from(Posts).where(eq(Posts.id, postId));
    
    if (posts.length === 0) {
      const newPost = {
        id: postId,
        title: "New Post Not Found",
        likes: 0,
      };
      await db.insert(Posts).values(newPost);
      posts.push(newPost);
    }

    const post = posts.at(0)!;
    post.likes += likes;

    await db.update(Posts).set(post).where(eq(Posts.id, postId));
    return true;
  },
});
