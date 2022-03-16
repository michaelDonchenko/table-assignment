import { UserType } from '../types/user-types'
import { tableColumns } from '../constants/table-columns'
import styled from 'styled-components'
import TableBodyRow from './table-body-row'

type TablePropsType = {
  users: Array<UserType>
}

const Table: React.FC<TablePropsType> = ({ users }) => {
  return (
    <Container>
      <StyledTable>
        <thead>
          <TR>
            {tableColumns.map((column) => (
              <TH key={column.key}>{column.title}</TH>
            ))}
          </TR>
        </thead>

        <tbody>
          {users.map((user) => (
            <TableBodyRow key={user.id} user={user} />
          ))}
        </tbody>
      </StyledTable>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  margin: 20px 0;
`

const StyledTable = styled.table`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  border-collapse: collapse;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 14px 28px, rgba(0, 0, 0, 0.5) 0px 10px 10px;
`
const TH = styled.th`
  padding: 8px 10px;
  text-align: start;
  cursor: default;
  font-size: 18px;
`

const TR = styled.tr`
  background-color: #20486a;
`

export default Table
