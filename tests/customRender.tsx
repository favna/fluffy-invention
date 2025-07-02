import "@testing-library/jest-dom/vitest";

import type { Theme } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import {
  render,
  renderHook,
  type Queries,
  type RenderHookOptions,
  type RenderHookResult,
  type RenderOptions,
  type RenderResult,
  type queries,
} from "@testing-library/react";
import type { JSX, JSXElementConstructor, ReactNode } from "react";
import type {
  Container as ReactDOMClientContainer,
  hydrateRoot,
} from "react-dom/client";

type RenderableContainer = ReactDOMClientContainer;
type HydrateableContainer = Parameters<typeof hydrateRoot>[0];

interface CustomRenderProps<
  Q extends Queries = typeof queries,
  Container extends HydrateableContainer | RenderableContainer = HTMLElement,
  BaseElement extends HydrateableContainer | RenderableContainer = Container,
> {
  renderOptions?: RenderOptions<Q, Container, BaseElement>;
}

type SetupProviderReturn = JSXElementConstructor<{ children: ReactNode }>;

type CustomRenderReturn<
  Q extends Queries = typeof queries,
  Container extends HydrateableContainer | RenderableContainer = HTMLElement,
  BaseElement extends HydrateableContainer | RenderableContainer = Container,
> = RenderResult<Q, Container, BaseElement>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withRouter(Provided: ({ children }: any) => JSX.Element) {
  const rootRoute = createRootRoute({
    component: Outlet,
  });

  const componentRoute = createRoute({
    path: "/",
    getParentRoute: () => rootRoute,
    component: Provided,
  });

  rootRoute.addChildren([componentRoute]);

  const router = createRouter({
    history: createMemoryHistory({ initialEntries: ["/"] }),
    routeTree: rootRoute,
  });

  return <RouterProvider router={router} />;
}

const theme: Theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        // This disables the MUI ripple during unit tests to prevent failing snapshots
        disableRipple: Boolean(import.meta.env.VITEST_POOL_ID),
      },
    },
  },
});

// Setup the custom renderer for @testing-library/react
function setupProvider(component: React.ReactNode): SetupProviderReturn {
  const provider = () => (
    <>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </>
  );

  return () => withRouter(provider);
}

function customRender<
  Q extends Queries = typeof queries,
  Container extends HydrateableContainer | RenderableContainer = HTMLElement,
  BaseElement extends HydrateableContainer | RenderableContainer = Container,
>(
  ui: React.ReactNode,
  options: CustomRenderProps<Q, Container, BaseElement> = {}
): CustomRenderReturn<Q, Container, BaseElement> {
  const renderOptions = options?.renderOptions ?? {};

  const wrapper = setupProvider(ui);

  return render(ui, { ...renderOptions, wrapper });
}

function customRenderHook<
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends HydrateableContainer | RenderableContainer = HTMLElement,
  BaseElement extends HydrateableContainer | RenderableContainer = Container,
>(
  callback: (initialProps: Props) => Result,
  options: RenderHookOptions<Props, Q, Container, BaseElement> = {}
): RenderHookResult<Result, Props> {
  return renderHook(callback, options);
}

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";

// override render method
export { customRender as render, customRenderHook as renderHook };
