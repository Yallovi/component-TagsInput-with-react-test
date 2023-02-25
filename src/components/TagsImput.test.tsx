import TagsInput from "./TagsInput";
import { render, screen } from "@testing-library/react";
import { getByTestId } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("TagsImput", () => {
  it("should render passed tags", () => {
    const tags = ["a", "b", "c"];

    render(<TagsInput tags={tags} onChange={() => null} />);

    const element = screen.getAllByTestId("tags");

    expect(element.length).toBe(tags.length);

    tags.forEach((el, i) => {
      const tagsElement = element[i];

      expect(tagsElement.textContent?.includes(el)).toBe(true);
    });
  });

  it("should be able to remove tag", async () => {
    const tags = ["a", "b", "c"];
    const changeFn = jest.fn();

    render(<TagsInput tags={tags} onChange={changeFn} />);

    const elements = screen.getAllByTestId("tags")[0];

    const removeElement = getByTestId(elements, "remove");

    await userEvent.click(removeElement);

    expect(changeFn).toBeCalledWith(["b", "c"]);
  });

  it("should be tag when typing comma", async () => {
    const onChange = jest.fn();

    const { rerender } = render(<TagsInput tags={[]} onChange={onChange} />);

    const input = screen.getByTestId("input");

    await userEvent.type(input, "first tag,");

    expect(onChange).toBeCalledWith(["first tag"]);

    rerender(<TagsInput tags={["first tag"]} onChange={onChange} />);

    await userEvent.type(input, "second tag,");

    expect(onChange).toBeCalledWith(["first tag", "second tag"]);

    rerender(
      <TagsInput tags={["first tag", "second tag"]} onChange={onChange} />
    );
  });

  it("should be able add tag when pressing enter", async () => {
    const onChange = jest.fn();

    const { rerender } = render(<TagsInput tags={[]} onChange={onChange} />);

    const input = screen.getByTestId("input");

    await userEvent.type(input, "first tag{enter}");

    expect(onChange).toBeCalledWith(["first tag"]);

    rerender(<TagsInput tags={["first tag"]} onChange={onChange} />);

    await userEvent.type(input, "second tag{enter}");

    expect(onChange).toBeCalledWith(["first tag", "second tag"]);

    rerender(
      <TagsInput tags={["first tag", "second tag"]} onChange={onChange} />
    );
  });
});
