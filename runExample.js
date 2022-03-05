import { execFileSync } from "child_process";
import { readFileSync } from "fs";

let previous = null;

for (let part of readFileSync(new URL("README.md", import.meta.url), { encoding: "utf8" })
        .split(/```(.*)/)
) {
    if (previous == "js") {
        execFileSync(
            "node",
            ["--input-type=module"],
            {input: part, encoding: "utf8", stdio: ["pipe", "inherit", "inherit"]}
        );
    }
    previous = part;
}