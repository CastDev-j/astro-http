import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId ?? '';

  try {

    const response = await db.select().from(Clients).where(eq(Clients.id, +clientId));

    if(response.length === 0) {
      return new Response(JSON.stringify({ msg: "Not Found :c" }), {
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

export const PATCH: APIRoute = async ({ params, request }) => {

  const clientId = params.clientId ?? '';

  try {
    const { id, ...body } = await request.json();

    const {lastInsertRowid} = await db.update(Clients).set(body).where(eq(Clients.id, +clientId));

    return new Response(
      JSON.stringify({ lastInsertRowid: +lastInsertRowid!.toString(), ...body }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Error" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId ?? '';

  try {
    const {rowsAffected} = await db.delete(Clients).where(eq(Clients.id, +clientId));

    return new Response( JSON.stringify({ rowsAffected: rowsAffected, msg: "Deleted"}), {
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
