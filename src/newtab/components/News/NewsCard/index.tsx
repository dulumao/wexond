import React from 'react';
import { loadImage } from '../../../../shared/utils/network';
import { getTimeOffset } from '../../../../shared/utils/time';
import { Card, CardHeader } from '../../../../shared/components/Card';

import {
  Title, Icon, Source, SecondaryText, CardImage, Overline, SourceContainer,
} from './styles';

export interface Props {
  data: any;
}

export interface State {
  loaded: boolean;
}

export default class NewsCard extends React.Component<Props, State> {
  public state: State = {
    loaded: false,
  };

  public async componentDidMount() {
    const { data } = this.props;

    await loadImage(data.urlToImage);
    await loadImage(data.icon);

    this.setState({ loaded: true });
  }

  public render() {
    const { data } = this.props;
    const { loaded } = this.state;

    let desc: string = data.description;
    if (data && data.description) {
      desc = data.description.replace(/&nbsp;/g, '');
    }

    return (
      <a href={data.url}>
        <Card>
          <CardImage visible={loaded} src={data.urlToImage} />
          <CardHeader>
            <Overline>{getTimeOffset(new Date(data.publishedAt), this)}</Overline>
            <Title>{data.title}</Title>

            {desc
              && desc.indexOf('�') === -1
              && desc.trim() !== '' && <SecondaryText>{desc}</SecondaryText>}

            <SourceContainer>
              <Icon visible={loaded} source={data.icon} />
              <Source>{data.source.name}</Source>
            </SourceContainer>
          </CardHeader>
        </Card>
      </a>
    );
  }
}
