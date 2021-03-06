import Component from '../../lib/component.js';
import history from '../../lib/history.js';
import { capitalize } from '../../utils/string.js';
import routeMap from '../router/map.js';

/**
 * Synchronize documet.title
 * also show in AppBar
 */
customElements.define(
  'app-title',
  class extends Component {
    static observedStores = [history.historyState];

    routeMap = Object.values(routeMap);

    render() {
      const { list, currentIndex } = history.historyState;
      const { path: currentPath, title } = list[currentIndex];
      const route = this.routeMap.find(({ path }) => path === currentPath);

      document.title = capitalize(
        title || (route && route.title) || routeMap.HOME.title,
      );
      if (this.hidden) return '';
      return document.title;
    }
  },
);
