import styled from 'styled-components';

import typography from '../../../../shared/mixins/typography';
import images from '../../../../shared/mixins/images';
import shadows from '../../../../shared/mixins/shadows';
import colors from '../../../../shared/defaults/colors';
import icons from '../../../../shared/mixins/icons';

import { WORKSPACE_FOLDER_SIZE, WORKSPACE_ICON_SIZE } from '../../../constants';

const addIcon = require('../../../../shared/icons/add.svg');

export const Root = styled.div`
  width: ${WORKSPACE_FOLDER_SIZE}px;
  height: ${WORKSPACE_FOLDER_SIZE}px;
  margin-left: 32px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.39);
  transition: 0.2s border;

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.79);

    & .icon {
      opacity: 0.79;
    }
  }
`;

export const Icon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${addIcon});
  opacity: 0.39;
  transition: 0.2s opacity;

  ${images.center('100%', 'auto')};
  ${icons.invertColors()};
`;
