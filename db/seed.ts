import { getCollection } from "astro:content";
import { Clients, db, Posts } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  // TODO

  await db.insert(Clients).values([
    { id: 1, name: "John", age: 30, isActive: true },
    { id: 2, name: "Jane", age: 25, isActive: false },
    { id: 3, name: "Alice", age: 35, isActive: true },
    { id: 4, name: "Bob", age: 40, isActive: false },
    { id: 5, name: "Charlie", age: 45, isActive: true },
  ]);

  const posts = await getCollection("blog");

  await db.insert(Posts).values(
    posts.map((post) => ({
      id: post.id,
      title: post.data.title,
      likes: Math.floor(Math.random() * 100),
    }))
  );

}
 