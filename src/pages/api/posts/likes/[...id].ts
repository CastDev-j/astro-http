import type { APIRoute } from "astro";
import { db, eq, Posts } from "astro:db";
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const postId = params.id ?? "";

  try {
    const response = await db.select().from(Posts).where(eq(Posts.id, postId));

    if (response.length === 0) {
      return new Response(JSON.stringify({ msg: "Not Found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Error" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  const postId = params.id ?? "";

  const { likes = 0 } = await request.json();

  try {
    const response = await db.select().from(Posts).where(eq(Posts.id, postId));

    if (response.length === 0) {
      const newPost = {
        id: postId,
        title: "New Post Not Found",
        likes: 1,
      };

      await db.insert(Posts).values(newPost);
      response.push(newPost);
    }

    const post = response.at(0)!;
    post.likes += likes;

    await db.update(Posts).set(post).where(eq(Posts.id, postId));

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Error" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};
