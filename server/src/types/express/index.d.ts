declare namespace Express {
  interface Request {
    user: {
      _id: unknown;
      username: string;
      email: string;
    };
  }
}

export interface User {
  _id: unknown;
  username: string;
  email: string;
}

export interface Context {
  user?: User;
}