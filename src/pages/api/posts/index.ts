import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const posts = await getCollection("blog");

  const url = new URL(request.url);

  const slug = url.searchParams.get("slug");
  

  console.log(slug);

  const postFind = posts.find((post) => post.slug === slug) || null;
  
  if (slug) {
    return new Response(JSON.stringify(postFind), {
      status: !postFind ? 404 : 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
