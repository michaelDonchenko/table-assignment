import { useState, useRef } from 'react'
import styled from 'styled-components'
import { UserType } from '../types/user-types'
import { updateUser } from '../services/users-service'
import { useEffect } from 'react'

type EditUserModalProps = {
  isModalVisible: boolean
  user: UserType
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isModalVisible,
  user,
  setIsModalVisible,
}) => {
  const ref: React.RefObject<HTMLFormElement> | null = useRef(null)
  const [name, setName] = useState(user.name)
  const [lastName, setLastName] = useState(user.lastName)

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await updateUser({ id: user.id, name, lastName, setIsModalVisible })
  }

  useEffect(() => {
    const checkIfClickedOutside = (event: any) => {
      if (
        isModalVisible &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setIsModalVisible(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [isModalVisible])

  return isModalVisible ? (
    <Form ref={ref} onSubmit={(event) => onFormSubmit(event)}>
      <FormControl>
        <Label>שם פרטי</Label>
        <Input
          value={name}
          id='name'
          type='text'
          placeholder='שם פרטי'
          onChange={(event) => setName(event.target.value)}
        />
      </FormControl>

      <FormControl>
        <Label>שם משפחה</Label>
        <Input
          value={lastName}
          id='last name'
          type='text'
          placeholder='שם משפחה'
          onChange={(event) => setLastName(event.target.value)}
        />
      </FormControl>

      <Button>שמור שינויים</Button>
    </Form>
  ) : (
    <div></div>
  )
}

const Form = styled.form`
  width: 200px;
  height: 200px;
  background-color: darkOrange;
  z-index: 100;
  position: absolute;
  top: 24px;
  border-radius: 4px;
  padding: 15px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 14px 28px, rgba(0, 0, 0, 0.5) 0px 10px 10px;
`

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 15px;
`

const Label = styled.label`
  font-size: 16px;
`

const Input = styled.input`
  width: 140px;
  padding: 4px 10px;
  font-size: 14px;
  font-weight: 300;
  border-radius: 4px;
  border: 1px solid lightgray;
  outline: none;
`

const Button = styled.button`
  width: 140px;
  color: white;
  background-color: steelblue;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  height: 25px;
  font-size: 14px;
  transition: all 0.2s linear;

  &:hover {
    transform: translateY(-2px);
  }
`

export default EditUserModal
