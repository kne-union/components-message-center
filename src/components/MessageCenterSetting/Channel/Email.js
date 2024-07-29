import { createWithRemoteLoader } from '@kne/remote-loader';

const Email = createWithRemoteLoader({
  modules: ['components-core:Layout@Page']
})(({ remoteModules }) => {
  const [Page] = remoteModules;
  return <div>邮件</div>;
});

export default Email;
