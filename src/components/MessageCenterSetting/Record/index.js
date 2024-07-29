import { createWithRemoteLoader } from '@kne/remote-loader';

const Record = createWithRemoteLoader({
  modules: ['components-core:Layout@Page']
})(({ remoteModules, menu }) => {
  const [Page] = remoteModules;
  return (
    <Page name="message-center-record" menu={menu}>
      消息记录
    </Page>
  );
});

export default Record;
