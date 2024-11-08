import { defineAction } from "astro:actions";
import { z } from 'astro:content';
import { db, Posts } from "astro:db";
import { eq } from "astro:db";
import { getPostLikes } from "./posts/get-post-likes-action";
import { updatePostLikes } from "./posts/updatePostLikes.action";

export const server = {
  // Posts
  getPostLikes, 
  updatePostLikes,
};
