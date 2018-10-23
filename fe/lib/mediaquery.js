// https://gist.github.com/gokulkrishh/242e68d1ee94ad05f488
// https://mediag.com/news/popular-screen-resolutions-designing-for-all/

const mediaQuery = {
  HOVER: '(hover: hover)',
  get isHover() {
    return window.matchMedia(this.HOVER).matches;
  },

  PHONE: '(min-width: 320px) and (max-width: 480px)',
  get isPhone() {
    return window.matchMedia(this.PHONE).matches;
  },

  SMALL_PHONE: '(min-width: 320px) and (max-width: 480px) and (max-height: 640px)',
  get isSmallPhone() {
    return window.matchMedia(this.SMALL_PHONE).matches;
  },

  WATCH: '(max-width: 319px)',
  get isWatch() {
    return window.matchMedia(this.WATCH).matches;
  },

  SHORT: '(min-width: 480px) and (max-height: 320px)',
  get isShort() {
    return window.matchMedia(this.SHORT).matches;
  },

  PWA: 'display-mode: standalone',
  get isPWA() {
    return window.matchMedia(this.PWA).matches;
  },

  MOTION_REDUCE: '(prefers-reduced-motion: reduce)',
  get isMotionReduce() {
    return window.matchMedia(this.MOTION_REDUCE).matches;
  },
};

window.mediaQuery = mediaQuery;
export default mediaQuery;
