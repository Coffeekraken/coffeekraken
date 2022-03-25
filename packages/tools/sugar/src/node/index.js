import __handleError from "./error/handleError";
import __exitCleanup from "./process/exitCleanup";
import __onProcessExit from "./process/onProcessExit";
__handleError();
__onProcessExit(() => {
  return __exitCleanup;
});
