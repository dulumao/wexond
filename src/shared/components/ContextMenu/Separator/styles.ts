import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';
import opacity from '../../../defaults/opacity';

export interface SeparatorProps {
  hide: boolean;
  visible: boolean;
}

export const StyledSeparator = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: rgba(0, 0, 0, ${opacity.light.dividers});
  height: 1px;
  width: 100%;
  transition: 0.2s opacity;

  opacity: ${({ visible }: SeparatorProps) => (visible ? 1 : 0)};
  display: ${({ hide }) => (hide ? 'none' : 'block')};
`;
