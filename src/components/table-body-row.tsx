import { UserType } from '../types/user-types'
import styled from 'styled-components'
import { deleteUser } from '../services/users-service'
import EditUserModal from './edit-user-modal'
import { useState } from 'react'

const TableBodyRow: React.FC<{ user: UserType }> = ({ user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <TR>
      <TD>{user.id}</TD>
      <TD>{user.name}</TD>
      <TD>{user.lastName}</TD>
      <TD>
        <EditButtonContainer>
          <EditUserModal
            user={user}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
          <Button
            onClick={() => setIsModalVisible(!isModalVisible)}
            buttonType='update'
          >
            עריכה
          </Button>
        </EditButtonContainer>
      </TD>
      <TD>
        <Button buttonType='delete' onClick={() => deleteUser(user.id)}>
          מחיקה
        </Button>
      </TD>
    </TR>
  )
}

const TR = styled.tr`
  background-color: steelblue;

  &:hover {
    background-color: #295e8c;
  }
`

const TD = styled.td`
  padding: 8px 10px;
  cursor: default;
`

const EditButtonContainer = styled.div`
  position: relative;
`

const Button = styled.button<{ buttonType: 'update' | 'delete' }>`
  width: 80px;
  color: white;
  background-color: ${(props) =>
    props.buttonType === 'update' ? 'darkOrange' : 'maroon'};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  height: 22px;
  font-size: 14px;
  transition: all 0.2s linear;

  &:hover {
    transform: translateY(-2px);
  }
`

export default TableBodyRow
