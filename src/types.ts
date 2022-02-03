export type Options = {
  dbpath: string,
  slackToken?: string,
  slackConversationId?: string
}

export type DbItems = {
  last_name: string,
  first_name: string,
  date_of_birth: string,
  email: string,
  provider: string,
  handle: string
}

export type Person = {
  last_name: string,
  first_name: string,
  date_of_birth: DecomposedDate,
  handle: string,
  provider: string,
  age?: number
}

export type DecomposedDate = {
  date: number,
  month: number,
  year: number
}

