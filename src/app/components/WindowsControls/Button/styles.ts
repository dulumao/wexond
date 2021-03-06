import styled from 'styled-components';
import images from '../../../../shared/mixins/images';

interface ButtonProps {
  icon: string;
  isClose?: boolean;
}

export const Button = styled.div`
  height: 100%;
  -webkit-app-region: no-drag;
  width: 45px;
  position: relative;

  margin-right: 1px;

  &:first-child {
    margin-right: 0;
  }

  transition: 0.2ss background-color;

  &:hover {
    background-color: ${({ isClose }: ButtonProps) =>
    (!isClose ? 'rgba(196, 196, 196, 0.4)' : '#e81123')};
  }
`;

interface IconProps {
  icon: string;
  isClose?: boolean;
}

export const Icon = styled.div`
  width: 100%;
  height: 100%;
  transition: 0.2ss filter;

  background-image: ${({ icon }: IconProps) => `url(${icon})`};
  ${images.center('11px', '11px')};

  &:hover {
    filter: ${({ isClose }) => isClose && 'invert(100%);'};
  }
`;
