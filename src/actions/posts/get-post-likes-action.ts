import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, Posts } from "astro:db";
import { eq } from "astro:db";

export const getPostLikes = defineAction({
    accept: "json",
    input: z.string(),
    handler: async (postId) => {

      const data = await db.select().from(Posts).where(eq(Posts.id, postId));
      const {likes} = data[0];

      return { likes:  likes ?? 0};
    },
  });