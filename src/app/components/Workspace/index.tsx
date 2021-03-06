import { TweenLite } from 'gsap';
import { observe } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import {
  Indicator, Tabs, Root, AddTabButton,
} from './styles';
import { TOOLBAR_HEIGHT } from '../../constants';
import Tab from '../../models/tab';
import TabComponent from '../Tab';
import Workspace from '../../models/workspace';
import Store from '../../store';
import Scrollbar from './Scrollbar';

const addTabIcon = require('../../../shared/icons/add.svg');

interface Props {
  workspace: Workspace;
}

@observer
export default class extends React.Component<Props, {}> {
  private tabs: HTMLDivElement;

  private scrollbar: Scrollbar;

  private lastScrollLeft = 0;

  private tabDragData = {
    dragging: false,
    mouseStartX: 0,
    startLeft: 0,
    lastMouseX: 0,
    direction: '',
  };

  public componentDidMount() {
    const { workspace } = this.props;

    window.addEventListener('resize', e => {
      if (!e.isTrusted) {
        return;
      }

      workspace.updateTabsBounds(false);

      const selectedTab = workspace.getSelectedTab();
      workspace.tabsIndicator.left = selectedTab.left;
      workspace.tabsIndicator.width = selectedTab.width;
    });

    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);

    requestAnimationFrame(() => {
      workspace.addTab();
    });

    observe(workspace.tabs, (change: any) => {
      if (change.addedCount > 0 && change.removedCount === 0) {
        const tab = change.added[0] as Tab;

        requestAnimationFrame(() => {
          tab.setLeft(tab.getLeft(), false);
          this.scrollbar.onNewTab(tab);
          workspace.updateTabsBounds();
        });
      }
    });

    workspace.getContainerWidth = this.getTabsWidth;
  }

  public componentWillUnmount() {
    const { workspace } = this.props;
    workspace.tabs = [];

    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mouseup', this.onMouseMove);
  }

  public getTabsWidth = () => this.tabs.offsetWidth;

  public getTabs = () => this.tabs;

  public onTabMouseDown = (e: React.MouseEvent<HTMLDivElement>, tab: Tab) => {
    this.tabDragData = {
      lastMouseX: 0,
      dragging: true,
      mouseStartX: e.pageX,
      startLeft: tab.left,
      direction: '',
    };

    Store.draggingTab = true;

    this.lastScrollLeft = this.tabs.scrollLeft;
  };

  public onMouseEnter = () => {
    const { workspace } = this.props;
    workspace.scrollbar.thumbVisible = true;
  };

  public onMouseLeave = () => {
    const { workspace } = this.props;
    workspace.scrollbar.thumbVisible = false;
  };

  public onMouseUp = () => {
    const { workspace } = this.props;

    this.tabDragData.dragging = false;
    workspace.setTabsPositions();

    Store.draggingTab = false;

    const selectedTab = workspace.getSelectedTab();
    if (selectedTab != null) {
      workspace.tabsIndicator.moveToTab(selectedTab);
      selectedTab.dragging = false;
    }
  };

  public onAddTabButtonClick = () => {
    const { workspace } = this.props;
    workspace.addTab();
  };

  public onMouseMove = (e: any) => {
    if (!this.props) return;

    const { workspace } = this.props;
    const selectedTab = workspace.getSelectedTab();

    if (this.tabDragData.dragging) {
      const { startLeft, mouseStartX } = this.tabDragData;
      const { scrollLeft } = this.tabs;

      const boundingRect = this.tabs.getBoundingClientRect();

      if (Math.abs(e.pageX - mouseStartX) < 5) {
        return;
      }

      selectedTab.dragging = true;
      Store.addressBar.canToggle = false;

      const newLeft = startLeft + e.pageX - mouseStartX - (this.lastScrollLeft - scrollLeft);

      let left = newLeft;

      if (newLeft < 0) {
        left = 0;
      } else if (newLeft + selectedTab.width > workspace.addTabButton.left + scrollLeft) {
        left = workspace.addTabButton.left - selectedTab.width;
      }

      selectedTab.setLeft(left, false);

      const createWindow = () => {
        // TODO: Create a new window
      };

      if (e.pageY > TOOLBAR_HEIGHT + 16 || e.pageY < -16) {
        createWindow();
      }

      if (e.pageX < boundingRect.left) {
        createWindow();
      }

      if (e.pageX - boundingRect.left > workspace.addTabButton.left) {
        createWindow();
      }

      TweenLite.to(workspace.tabsIndicator, 0, { left: selectedTab.left });

      let direction = '';
      if (this.tabDragData.lastMouseX - e.pageX >= 1) {
        direction = 'left';
      } else if (this.tabDragData.lastMouseX - e.pageX <= -1) {
        direction = 'right';
      }

      if (direction !== '') {
        this.tabDragData.direction = direction;
      }

      workspace.getTabsToReplace(selectedTab, this.tabDragData.direction);

      this.tabDragData.lastMouseX = e.pageX;
    }
  };

  public render() {
    const { workspace } = this.props;
    const { workspaces } = Store;

    const selected = workspace.id === workspaces.selected;

    return (
      <Root visible={selected}>
        <Tabs
          innerRef={(r: any) => (this.tabs = r)}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          {workspace.tabs.map(tab => (
            <TabComponent key={tab.id} tab={tab} onTabMouseDown={this.onTabMouseDown} />
          ))}
          <Indicator
            style={{
              width: workspace.tabsIndicator.width,
              left: workspace.tabsIndicator.left,
            }}
          />
        </Tabs>
        <AddTabButton
          icon={addTabIcon}
          onClick={this.onAddTabButtonClick}
          divRef={r => (workspace.addTabButton.ref = r)}
        />
        <Scrollbar
          ref={r => (this.scrollbar = r)}
          scrollbar={workspace.scrollbar}
          getTabs={this.getTabs}
        />
      </Root>
    );
  }
}
