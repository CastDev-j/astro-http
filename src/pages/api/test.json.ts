import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const actresses = [
    { name: "Mia Khalifa", age: 28 },
    { name: "Sasha Grey", age: 33 },
    { name: "Lisa Ann", age: 49 },
    { name: "Riley Reid", age: 30 },
    { name: "Mia Malkova", age: 29 },
    { name: "Brandi Love", age: 48 },
    { name: "Lana Rhoades", age: 25 },
    { name: "Abella Danger", age: 26 },
    { name: "Eva Lovia", age: 32 },
    { name: "Nicole Aniston", age: 34 },
    { name: "Adriana Chechik", age: 30 },
    { name: "August Ames", age: 23 },
    { name: "Kendra Lust", age: 43 },
    { name: "Angela White", age: 36 },
    { name: "Jenna Jameson", age: 47 },
    { name: "Tori Black", age: 33 },
    { name: "Sunny Leone", age: 40 },
    { name: "Asa Akira", age: 35 },
    { name: "Gianna Michaels", age: 37 },
    { name: "Lexi Belle", age: 34 },
  ];

  return new Response(JSON.stringify(actresses), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};
