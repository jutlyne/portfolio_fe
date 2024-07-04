export interface CommentInterface {
  id: number
  body: string
  postId: number
  user: {
    username: string
  }
}

export interface StoreCommentInterface {
  body: string
  postId: number
  userId: number
}
