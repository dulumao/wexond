import styled from 'styled-components';

import { UITheme } from '../../../shared/enums';

export interface StyledAppProps {
  theme: UITheme;
}

export const StyledApp = styled.div`
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 32px;

  background-color: ${({ theme }: StyledAppProps) =>
    (theme === UITheme.Light ? '#F5F5F5' : '#212121')};
`;
