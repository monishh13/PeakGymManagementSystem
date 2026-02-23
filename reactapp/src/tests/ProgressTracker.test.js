import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProgressTracker from "../components/ProgressTracker";

jest.mock("../utils/api", () => ({
  api: {
    getUserProgress: jest.fn(),
    updateUserProgress: jest.fn(),
  },
}));
const { api } = require("../utils/api");

describe("ProgressTracker", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function setup(userId) {
    return render(
      <MemoryRouter initialEntries={[`/progress/{userId}`.replace('{userId}', userId)]}>
        <Routes>
          <Route path="/progress/:userId" element={<ProgressTracker />} />
        </Routes>
      </MemoryRouter>
    );
  }

  test("State_shows progress bars and update button", async () => {
    api.getUserProgress.mockResolvedValueOnce([
      {
        progressId: 7,
        workoutPlan: { title: "Plan1", difficulty: "BEGINNER" },
        completionPercentage: 0,
        lastUpdated: null,
      },
      {
        progressId: 9,
        workoutPlan: { title: "Plan2", difficulty: "ADVANCED" },
        completionPercentage: 100,
        lastUpdated: "2024-01-10",
      },
    ]);
    api.updateUserProgress.mockImplementationOnce(async () => {
      await new Promise(r => setTimeout(r, 5));
      return {
        progressId: 7,
        workoutPlan: { title: "Plan1", difficulty: "BEGINNER" },
        completionPercentage: 70,
        lastUpdated: "2024-07-20",
      };
    });
    setup(22);
    expect(await screen.findByText(/Plan1/)).toBeInTheDocument();
    expect(screen.getByTestId("progress-bar-7")).toHaveStyle("width: 0%")
    expect(screen.getByTestId("progress-bar-9")).toHaveStyle("width: 100%")
    fireEvent.click(screen.getByTestId("update-progress-btn-7"));
    const matches = await screen.findAllByText((content, el) => el.textContent.trim() === '70%', {exact: false});
    expect(matches.length).toBeGreaterThan(0);
    // The button should still be enabled after the update is done (since updating = false and percent < 100)
    await waitFor(() => {
      expect(screen.getByTestId("update-progress-btn-9")).toBeDisabled();
    });
    // The first button (progress 7) is enabled for next increment, since percent is only 70 now
    expect(screen.getByTestId("update-progress-btn-7")).not.toBeDisabled();
  });

  test("State_shows empty state", async () => {
    api.getUserProgress.mockResolvedValueOnce([]);
    setup(56);
    expect(await screen.findByText(/no assigned plans/i)).toBeInTheDocument();
  });

  test("ErrorHandling_shows error", async () => {
    api.getUserProgress.mockRejectedValueOnce({ error: "Not found" });
    setup(12);
    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });
});
