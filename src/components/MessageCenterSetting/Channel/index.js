import { createWithRemoteLoader } from '@kne/remote-loader';
import ChannelFormInner from '@components/ChannelFormInner';
import { Space, Button } from 'antd';

const Channel = createWithRemoteLoader({
  modules: ['components-core:Layout@Page', 'components-core:FormInfo@useFormModal']
})(({ remoteModules, menu }) => {
  const [Page, useFormModal] = remoteModules;
  const formModal = useFormModal();
  return (
    <Page
      menu={menu}
      title="渠道配置"
      name="message-center-channel"
      titleExtra={
        <Space>
          <Button
            type="primary"
            onClick={() => {
              formModal({
                title: '添加渠道',
                children: <ChannelFormInner />
              });
            }}
          >
            添加渠道
          </Button>
        </Space>
      }
    ></Page>
  );
});
export default Channel;
