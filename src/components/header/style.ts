import { Container } from 'react-grid-system'
import styled from 'styled-components'

export const Label = styled.p`
  &:hover {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
`
export const WrapperContainer = styled(Container)`
  background: '#FFFF';
  minheight: '70px';
  justifyitems: 'center';
  font-size: 1.25rem;
  box-sizing: content-box;

  padding: 1rem 0;

  p > {
    box-sizing: content-box;
  }
`
