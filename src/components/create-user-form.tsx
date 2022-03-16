import { useState } from 'react'
import styled from 'styled-components'
import { UserType } from '../types/user-types'
import { addUser } from '../services/users-service'

const CreateUserForm: React.FC<{ users: Array<UserType> }> = ({ users }) => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')

  const resetStateValues = () => {
    setId('')
    setName('')
    setLastName('')
  }

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await addUser({ users, id, name, lastName, resetStateValues })
  }

  return (
    <Form onSubmit={(event) => onFormSubmit(event)}>
      <FormControl>
        <Label>תעודת זהות</Label>
        <Input
          value={id}
          id='id'
          type='text'
          placeholder='ת.ז'
          onChange={(event) => setId(event.target.value)}
        />
      </FormControl>

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
          id='lastName'
          type='text'
          placeholder='שם משפחה'
          onChange={(event) => setLastName(event.target.value)}
        />
      </FormControl>

      <FormControl>
        <Button type='submit'>צור יוזר חדש</Button>
      </FormControl>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  align-self: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  margin-top: 20px;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`
const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 15px;
  margin-bottom: 15px;

  @media (max-width: 400px) {
    align-items: center;
  }
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
    opacity: 0.9;
    transform: translateY(-2px);
  }
`

export default CreateUserForm
