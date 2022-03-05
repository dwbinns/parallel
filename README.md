# Run tasks with limited parallelism

```js
import parallel from "@dwbinns/parallel";
import { setTimeout } from "timers/promises";

function run(id) {
  return async () => {
    console.log("Start", id);
    await setTimeout(10, id);
    console.log("End", id);
    return id;
  };
}

const queue = parallel(2);

const results = await Promise.all([
  queue(run(1)),
  queue(run(2)),
  queue(run(3)),
  queue(run(4)),
]);

console.log(results);
```

```
Start 1
Start 2
End 1
Start 4
End 2
Start 3
End 4
End 3
[ 1, 2, 3, 4 ]
```
