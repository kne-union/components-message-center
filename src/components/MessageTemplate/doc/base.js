const { default: MessageTemplate } = _MessageTemplate;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:FormInfo@Form']
})(({ remoteModules }) => {
  const [Form] = remoteModules;
  return (
    <Form>
      <MessageTemplate />
    </Form>
  );
});

render(<BaseExample />);
