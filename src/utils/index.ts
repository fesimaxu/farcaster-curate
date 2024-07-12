export const sendSuccessfulResponse = (
    res: any,
    statusCode: number,
    data: Record<string, any> | string | null,
    message: string = "successful"
  ) =>
    res.status(statusCode).json({
      message: message,
      status: statusCode,
      data: data,
      success: true,
    });
  
  export const sendErrorResponse = (
    res: any,
    statusCode: number = 500,
    data: any,
    message: string = "error! request failed"
  ) => {
    if (data.code === 11000) {
      const field = Object.keys(data.keyPattern)[0];
      const value = data.keyValue[field];
      const message = `Duplicate key error: ${field} with value ${value} already exists.`;
  
      return res.status(statusCode).json({
        message: message,
        status: statusCode,
        data: data,
        error: true,
      });
    } else {
      // Handle other errors
      return res.status(statusCode).json({
        message: message,
        status: statusCode,
        data: data,
        error: true,
      });
    }
  };
  