import React, { useState } from "react";

const Counter = () => {
  const [le, setle] = useState(0);

  return (
    <div>
    <button onClick={() => setle(le + 1)}>
  - + -
</button>
<h5 key={le}>המספר פלוס אחד {le}</h5>

      {console.log("le state:", le)

      }
    </div>
  );
};

export default Counter;
