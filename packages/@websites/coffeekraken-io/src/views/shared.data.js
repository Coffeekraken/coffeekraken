import __childProcess from "child_process";

export default function () {
  const commitId = __childProcess
    .execSync('git log -n1 --format="%h"')
    .toString()
    .trim();
  const commitDate = __childProcess
    .execSync("git log -1 --format=%cd ")
    .toString()
    .trim();

  return {
    SUGAR: {
      config: {
        project: {
          environments: {
            dev: {
              commit: {
                id: commitId,
                time: Date.parse(commitDate),
              },
            },
          },
        },
      },
    },
  };
}
