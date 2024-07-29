const { default: ChannelFormInner } = _ChannelFormInner;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:FormInfo@Form']
})(({ remoteModules }) => {
  const [Form] = remoteModules;
  return (
    <Form
      onSubmit={data => {
        console.log(data);
      }}
    >
      <ChannelFormInner />
    </Form>
  );
});

render(<BaseExample />);
