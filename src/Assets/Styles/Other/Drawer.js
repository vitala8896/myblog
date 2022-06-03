import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const StyleDrawer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  max-width: 300px;
  padding: 20px 20px;
  box-sizing: border-box;
  transform: translateX(0px);
  transition: transform .22s ease-in;
  z-index: 90;
  background: #ebf0ff;
  &.close {
    transform: translateX(-300px)
  }
`;
export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 60px 0 0;
`;
export const StyledNavLink = styled(NavLink)`
  position: relative; 
  color: #363d54;
  font-size: 30px;
  text-decoration: none;
  background: #ebf0ff;
  line-height: 1;
  transition: opacity .3s;
  cursor: pointer;
  margin-bottom: 30px;
  &.active {
    opacity: .7;
  }
  :hover {
    opacity: .7;
  }
`;