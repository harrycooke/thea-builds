'use strict';

const {Menu, MenuItem, nativeImage} = require('electron');
const {getWindows, activateWindow} = require('mac-windows');
const {getAppIconListByPid} = require('node-mac-app-icon');
const Store = require('electron-store');

//const {selectApp} = require('../cropper');

const APP_BLACKLIST = [
  'Thea Health',
  'Kap Beta'
];

const store = new Store({
  name: 'usage-history'
});

const usageHistory = store.get('appUsageHistory', {});

const isValidApp = ({ownerName}) => !APP_BLACKLIST.includes(ownerName);

const getWindowList = async () => {
  const windows = await getWindows();
  const images = await getAppIconListByPid(windows.map(win => win.pid), {
    size: 16,
    failOnError: false
  });

  let maxLastUsed = 0;


  return windows.filter(window => isValidApp(window)).map(win => {
    const iconImage = images.find(img => img.pid === win.pid);
    const icon = iconImage.icon ? nativeImage.createFromBuffer(iconImage.icon) : null;
    const iconPNG = icon.toDataURL();
    const window = {
      ...win,
      icon2x: icon,
      icon: icon ? icon.resize({width: 24, height: 24}) : null,
      iconPNG: iconPNG,
      count: 0,
      lastUsed: 0,
      ...usageHistory[win.pid]
    };

    maxLastUsed = Math.max(maxLastUsed, window.lastUsed);
    return window;
  }).sort((a, b) => {
    if (a.lastUsed === maxLastUsed) {
      return -1;
    }

    if (b.lastUsed === maxLastUsed) {
      return 1;
    }

    return b.count - a.count;
  });
};

const buildWindowsMenu = async () => {
  const menu = new Menu();
  const windows = await getWindowList();
  console.log("called this ")
  for (const win of windows) {
    menu.append(
      new MenuItem({
        label: win.ownerName,
        icon: win.icon,
        type: 'checkbox',
        click: () => activateApp(win)
      })
    );
  }

  return menu;
};

const updateAppUsageHistory = app => {
  const {count = 0} = usageHistory[app.pid] || {};

  usageHistory[app.pid] = {
    count: count + 1,
    lastUsed: Date.now()
  };

  store.set('appUsageHistory', usageHistory);
};

const activateApp = window => {
  updateAppUsageHistory(window);
  selectApp(window, activateWindow);
};

module.exports = {
  buildWindowsMenu,
  getWindowList,
  activateApp
};