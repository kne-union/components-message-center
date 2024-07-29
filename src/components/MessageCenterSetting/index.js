import { createWithRemoteLoader } from '@kne/remote-loader';
import { Routes, Route, Navigate } from 'react-router-dom';
import Template from './Template';
import Record from './Record';
import Channel from './Channel';

const MessageCenterSetting = createWithRemoteLoader({
  modules: ['components-core:Menu']
})(({ remoteModules, baseUrl, getMenuList }) => {
  const [Menu] = remoteModules;
  const menu = (
    <Menu
      items={getMenuList([
        {
          key: 'template',
          label: '消息模板',
          path: `${baseUrl}/template`
        },
        {
          key: 'record',
          label: '消息记录',
          path: `${baseUrl}/record`
        },
        {
          key: 'channel',
          label: '渠道配置',
          path: `${baseUrl}/channel`
        }
      ])}
    />
  );
  return (
    <Routes>
      <Route index element={<Navigate to={`${baseUrl}/template`} replace />} />
      <Route path="template" element={<Template menu={menu} />} />
      <Route path="record" element={<Record menu={menu} />} />
      <Route path="channel" element={<Channel menu={menu} />} />
    </Routes>
  );
});

MessageCenterSetting.defaultProps = {
  getMenuList: list => list,
  baseUrl: ''
};

export default MessageCenterSetting;
