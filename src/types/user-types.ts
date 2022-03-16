export type UserType = {
  id: string
  name: string
  lastName: string
}

export type AddUserOptionsType = {
  users: Array<UserType>
  id: string
  name: string
  lastName: string
  resetStateValues: () => void
}

export type UpdateUserOptionsType = {
  id: string
  name: string
  lastName: string
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}
