import GlobalStyle from './styles/global-css'
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { useState } from 'react'
import { UserType } from './types/user-types'
import Table from './components/table'
import CreateUserForm from './components/create-user-form'
import { fetchUsers } from './services/users-service'
import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
  const [users, setUsers] = useState<Array<UserType>>([])

  useEffect(() => {
    fetchUsers(setUsers)
  }, [])

  return (
    <Container>
      <GlobalStyle />
      <ToastContainer position='bottom-right' rtl={true} />

      <CreateUserForm users={users} />
      {users.length > 0 && <Table users={users} />}
    </Container>
  )
}

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export default App
