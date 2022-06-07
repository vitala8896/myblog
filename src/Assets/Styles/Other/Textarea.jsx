import styled from 'styled-components'

export const StyleTextarea = styled.div`
  margin-bottom: 10px;
  label {
    display: block;
    font-weight: bold;
  };
  span {
    color: #f01f30;
    font-size: 12px;
    font-weight: bold;
  };
  textarea {
    display: block;
    box-sizing: border-box;
    background: #f5f1f1;
    border-bottom: 1px solid rgb(209, 209, 209);
    padding: 0 7px;
    width: 500px;
    height: 150px;
    outline: none;
    transition: all 300ms ease-in-out;
    @media (max-width: 768px){
      width: 100%;
    }
  };
  .invalid label {
    color: #f01f30;
  }  
`;



