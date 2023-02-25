import { useState } from "react";
import TagsInput from "./components/TagsInput";
import "./styles.css";

export default function App() {
  const [tags, handleTags] = useState<Array<string>>(["tags1", "tags2"]);

  return (
    <div className="App">
      <TagsInput tags={tags} onChange={handleTags} />
    </div>
  );
}
