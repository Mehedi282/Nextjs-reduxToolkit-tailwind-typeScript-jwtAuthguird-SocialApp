export interface User {
    id: number,
    fullName: string,
    email?: string, // Optional property (if email might be missing for some users)
    // password should not be included in the interface
    createdAt: string;
  }


  export interface Post {
    id: number;
    photos: string[]; // Array of image URLs as strings
    content: string;
    userId: number;
  }