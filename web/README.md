> Generic Page Structure Sample

```typescript
import type { NextPage } from "next";
import Main from "../layouts/Main";

const Page: NextPage = () => {
  return (
    <Main pageTitle="Page Title">
      <h1>{PAGE_CONTENT}</h1>
    </Main>
  );
};

export default Page;
```
