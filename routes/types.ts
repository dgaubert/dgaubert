import { Post } from "@/utils/posts.ts";

export interface PageData {
  posts?: Post[];
  post?: Post;
  content?: string;
}

export interface RequestState {
  sessionId?: string;
  isFriend: boolean;
}
  
