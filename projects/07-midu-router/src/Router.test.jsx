import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Router } from "./Router";
import { Route } from "./Route";
import { getCurrentPath } from "./utils";
import { Link } from "./Link";

vi.mock("./utils", () => ({
  getCurrentPath: vi.fn(),
}));

describe("Router", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render without problems", () => {
    render(<Router routes={[]} />);
    expect(true).toBeTruthy();
  });

  it("should render 404   if no routes match", () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />);
    expect(screen.getByText("404")).toBeTruthy();
  });

  it("should render the component of the first route that matches", () => {
    getCurrentPath.mockReturnValue("/about");
    const routes = [
      {
        path: "/",
        component: () => <h1>Home</h1>,
      },
      {
        path: "/about",
        component: () => <h1>About</h1>,
      },
    ];

    render(<Router routes={routes} defaultComponent={() => <h1>404</h1>} />);
    expect(screen.getByText("About")).toBeTruthy;
  });

  it("should navigate using Links", async () => {
    getCurrentPath.mockReturnValueOnce("/");

    render(
      <Router>
        <Route
          path="/"
          component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link to="/about">Go to about</Link>
              </>
            );
          }}
        />

        <Route path="/about" component={() => <h1>About</h1>} />
      </Router>
    );

    //Click on the link
    const anchor = screen.getByText(/Go to about/);
    fireEvent.click(anchor);

    const aboutTitle = await screen.findByText("About");

    // Check that the new route is rendered
    expect(aboutTitle).toBeTruthy();
  });
});
