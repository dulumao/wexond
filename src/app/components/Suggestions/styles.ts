import styled from 'styled-components';
import opacity from '../../../shared/defaults/opacity';

interface SuggestionsProps {
  visible: boolean;
}

export const StyledSuggestions = styled.div`
  z-index: 50;
  width: 100%;
  border-top: 0px solid rgba(0, 0, 0, ${opacity.light.dividers});
  transition: 0.1s height;

  color: rgba(0, 0, 0, ${opacity.light.primaryText});
`;

export const Caption = styled.div`
  height: 42px;
  display: flex;
  align-items: center;
  margin-left: 16px;
  font-size: 12px;
  font-weight: 500;
  opacity: ${opacity.light.secondaryText};
`;
