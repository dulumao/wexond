import React from 'react';
import { observer } from 'mobx-react';
import {
  Container, Title, Header, Dark, Menu, Content, Search, Input, SearchIcon,
} from './styles';
import Item from './Item';
import Store from '../../store';

interface Props {
  children?: any;
  title?: string;
}

@observer
export default class extends React.Component<Props, {}> {
  public static Item = Item;

  private items: Item[] = [];

  private contentRef: any;

  public onDarkClick = () => {
    requestAnimationFrame(() => {
      Store.menu.visible = false;
      Store.menu.selectedItem = null;
    });
  };

  private onItemClick = (e: React.MouseEvent<HTMLDivElement>, item: Item) => {
    if (item) {
      Store.menu.selectedItem = item.props.id;
    }
  };

  private onInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.contentRef && typeof this.contentRef.onMenuSearchInput === 'function') {
      this.contentRef.onMenuSearchInput(e);
    }
  };

  public render() {
    const { title, children } = this.props;

    let id = 0;

    this.items = this.items.filter(Boolean);

    let selectedItem;

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item && item.props.id === Store.menu.selectedItem) {
        selectedItem = item;
        break;
      }
    }

    return (
      <React.Fragment>
        <Container visible={Store.menu.visible}>
          <Content visible={selectedItem != null}>
            {selectedItem
              && React.cloneElement(selectedItem.props.content, {
                ref: (r: any) => (this.contentRef = r),
              })}
          </Content>
          <Menu>
            <Header>
              {(selectedItem
                && selectedItem.props.searchVisible && (
                  <Search>
                    <SearchIcon />
                    <Input placeholder="Search" onInput={this.onInput} />
                  </Search>
              )) || <Title>{title}</Title>}
            </Header>

            {React.Children.map(children, (el: React.ReactElement<any>) =>
              React.cloneElement(el, {
                id: id++,
                ref: (r: Item) => this.items.push(r),
                onClick: this.onItemClick,
              }))}
          </Menu>
        </Container>
        <Dark onClick={this.onDarkClick} visible={Store.menu.visible} />
      </React.Fragment>
    );
  }
}
