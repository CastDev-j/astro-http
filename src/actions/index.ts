import { getPostLikes } from "./posts/get-post-likes-action";
import { updatePostLikes } from "./posts/updatePostLikes.action";

export const server = {
  // Posts
  getPostLikes, 
  updatePostLikes,
};
