class CustomErrorHandler extends Error {
  status: number;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  //why static ?? => object create krne ki garaj nahi rehti direct he call kr skte hai
  static alreadyUserExist(message = "") {
    return new CustomErrorHandler(409, message);
  }
  static wrongCredential(message = "Email or password is wrong") {
    return new CustomErrorHandler(409, message);
  }

  static unAuthorized(message = "unAuthorized") {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message = "Not found") {
    return new CustomErrorHandler(404, message);
  }

  static uploadFail(message = "Internal server Error") {
    return new CustomErrorHandler(500, message);
  }
}

export default CustomErrorHandler;
