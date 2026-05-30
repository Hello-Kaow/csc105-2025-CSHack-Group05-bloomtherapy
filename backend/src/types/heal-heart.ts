export interface HealMessage {
  id: string
  text: string
  userId: string
  edited: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateMessageDto {
  text: string
}

export interface UpdateMessageDto {
  text: string
}

export interface AuthUser {
  id: string
  name?: string | null
  email?: string | null
}

export type MessagesResponse = HealMessage[]
export type MessageResponse = HealMessage