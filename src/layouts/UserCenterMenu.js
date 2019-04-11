const menuData = [
    // {
    //   name: 'Dashboard',   // 暂时先不放
    //   icon: 'icon-desktop',
    //   path: 'account/dashboard', // 没有children的一级menu的path规则 xxx／index,
    //   key: 'account/dashboard',
    // },
    {
      name: 'Account Information',
      icon: 'icon-data',
      path: 'account/info',
      key: 'account/info',
    },
    {
      name: 'Order Center',
      icon: 'icon-clipboard',
      path: 'account/order',
      key: 'account/order',
    },
    {
      name: 'Channel Manage',
      icon: 'icon-users',
      path: 'account/channel',
      key: 'account/channel',
    },
    {
      name: 'Message',
      icon: 'icon-message',
      path: 'account/message',
      key: 'account/message',
    },
    {
      name: 'Favorites',
      icon: 'icon-collection-o',
      path: 'account/favorites',
      key: 'account/favorites',
    },
  ];
  
  function formatter(data, channelFlag, parentPath = '', parentAuthority) {
    return data.map((item) => {
      if (item.name === 'Channel Manage') {
        item.hideInMenu = channelFlag ? false : true;
      }
      const result = {
        ...item,
        path: `${parentPath}${item.path}`,
        authority: item.authority || parentAuthority,
      };
      if (item.children) {
        result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
      }
      return result;
    });
  }
  
  export const getUCMenuData = (channelFlag) => formatter(menuData, channelFlag);
  