import { db } from '../firebase/firebase-config'
import {
  query,
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore'
import {
  AddUserOptionsType,
  UpdateUserOptionsType,
  UserType,
} from '../types/user-types'
import { toast } from 'react-toastify'

export const usersQuery = query(collection(db, 'users'))

export const fetchUsers = async (
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>
) => {
  try {
    onSnapshot(usersQuery, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((user) => ({
          ...(user.data() as UserType),
          id: user.id,
        }))
      )
    })
  } catch (error) {
    console.log(error)
  }
}

export const addUser = async (options: AddUserOptionsType) => {
  const { id, name, lastName, users, resetStateValues } = options

  const idRegexCheck = /^\d+$/

  if (!id || !name || !lastName) {
    return toast.error('יש למלא את כל השדות')
  }

  if (id.length !== 9 || !idRegexCheck.test(id)) {
    return toast.error('תעודת זהות לא תקינה')
  }

  // validate if id exists in the db
  const isUserExists = users.find((user) => user.id === id)

  if (isUserExists) {
    toast.info('התעודת זהות כבר קיימת נסו מספר אחר..')
    return
  }

  try {
    await setDoc(doc(db, 'users', id), {
      name: name,
      lastName: lastName,
    })

    resetStateValues()
    toast.success('המשתמש נוצר בהצלחה')
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (id: string) => {
  const isConfirmed = window.confirm('האם אתה רוצה למחוק את המשתמש?')

  if (!isConfirmed) {
    return
  }

  try {
    await deleteDoc(doc(db, 'users', id))
    toast.success('המשתמש נמחק בהצלחה')
  } catch (error) {
    console.log(error)
    toast.error('לא הייתה אפשרות למחוק את המשתמש')
  }
}

export const updateUser = async (options: UpdateUserOptionsType) => {
  const { id, name, lastName, setIsModalVisible } = options
  try {
    await updateDoc(doc(db, 'users', id), {
      name,
      lastName,
    })

    toast.success('המשתמש עודכן בהצלחה')
    setIsModalVisible(false)
  } catch (error) {
    console.log(error)
    toast.error('לא הייתה אפשרות לעדכן את המשתמש')
  }
}
