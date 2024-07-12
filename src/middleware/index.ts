import { sendErrorResponse } from "../utils";

const errorHandler = (err: any, req: any, res: any, next: any) => {
  sendErrorResponse(res, 500, err);
};

export default errorHandler;
