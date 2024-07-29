import { createWithRemoteLoader } from '@kne/remote-loader';

const Template = createWithRemoteLoader({
  modules: ['components-core:Layout@Page']
})(({ remoteModules, menu }) => {
  const [Page] = remoteModules;
  return (
    <Page name="message-center-template" menu={menu}>
      消息模板
    </Page>
  );
});

export default Template;
