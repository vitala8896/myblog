import styled from 'styled-components'

export const Creator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Input = styled.input`
  background: #f5f1f1;
  border-bottom: 1px solid rgb(209, 209, 209);
  border-radius: 5px;
  height: 40px;
  padding: 0 15px;
  flex-grow: 1;
  margin: 0 5px;
`;
export const Add = styled.span`
  background: #b3b3b3;
  border-radius: 50%;
  :hover {
    background: #6b6b6b;
    cursor: pointer;
  }
`;