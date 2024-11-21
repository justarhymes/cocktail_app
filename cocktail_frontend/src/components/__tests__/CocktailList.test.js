import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import "@testing-library/jest-dom";
import CocktailList from "../CocktailList";

const mockCocktails = [
  {
    id: 1,
    slug: "van-vleet",
    name: "Van Vleet",
    category: "Ordinary Drink",
    image: "https://www.thecocktaildb.com/images/media/drink/fgq2bl1492975771.jpg",
  },
  {
    id: 2,
    slug: "just-a-moonmint",
    name: "Just a Moonmint",
    category: "Shake",
    image: "https://www.thecocktaildb.com/images/media/drink/znald61487604035.jpg",
  },
];

describe("CocktailList Component", () => {
  it("renders 'All Drinks' heading when no searchPhrase is provided", () => {
    render(
      <MemoryRouter>
        <CocktailList
          cocktails={mockCocktails}
          searchPhrase=""
          currentPage={1}
          totalPages={1}
          onPageChange={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("All Drinks")).toBeInTheDocument();
  });

  it("renders 'Search: {searchPhrase}' heading when searchPhrase is provided", () => {
    render(
      <MemoryRouter>
        <CocktailList
          cocktails={mockCocktails}
          searchPhrase="Margarita"
          currentPage={1}
          totalPages={1}
          onPageChange={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Search: Margarita")).toBeInTheDocument();
  });

  it("renders the correct number of cocktails", () => {
    render(
      <MemoryRouter>
        <CocktailList
          cocktails={mockCocktails}
          searchPhrase=""
          currentPage={1}
          totalPages={1}
          onPageChange={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getAllByRole("link")).toHaveLength(mockCocktails.length);
  });

  it("disables 'Previous' button when on the first page", () => {
    render(
      <MemoryRouter>
        <CocktailList
          cocktails={mockCocktails}
          searchPhrase=""
          currentPage={1}
          totalPages={3}
          onPageChange={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Previous Page").closest("button")).toBeDisabled();
  });

  it("disables 'Next' button when on the last page", () => {
    render(
      <MemoryRouter>
        <CocktailList
          cocktails={mockCocktails}
          searchPhrase=""
          currentPage={3}
          totalPages={3}
          onPageChange={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Next Page").closest("button")).toBeDisabled();
  });

  it("calls onPageChange when 'Next' button is clicked", () => {
    const mockOnPageChange = jest.fn();

    render(
      <MemoryRouter>
        <CocktailList
          cocktails={mockCocktails}
          searchPhrase=""
          currentPage={1}
          totalPages={3}
          onPageChange={mockOnPageChange}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText("Next Page").closest("button"));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });
});
