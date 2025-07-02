import { App } from "#/App";
import { render, screen } from "#__tests__/customRender";

describe("App", () => {
  const renderComponent = async () => {
    const view = render(<App />);
    await screen.findByTestId("app-container");
    return view;
  };

  it("GIVEN App THEN matches snapshot", async () => {
    const view = await renderComponent();
    expect(view).toMatchSnapshot();
  });
});
