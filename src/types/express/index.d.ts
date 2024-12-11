import { Document } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: Document & {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        day: number;
        month: number;
        year: number;
        gender: string;
        city: string;
        country: string;
        profilePicture?: string;
        coverPicture?: string;
        about?: string;
        followers: any[];
        following: any[];
        isAdmin: boolean;
        createdAt: Date;
      };
    }
  }
}

export {};
