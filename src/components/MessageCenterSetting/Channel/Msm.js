import { createWithRemoteLoader } from '@kne/remote-loader';

const Msm = createWithRemoteLoader({
  modules: ['components-core:Layout@Page']
})(({ remoteModules }) => {
  const [Page] = remoteModules;
  return <div>短信</div>;
});

export default Msm;
