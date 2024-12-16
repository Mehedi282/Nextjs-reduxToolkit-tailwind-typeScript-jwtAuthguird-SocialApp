export interface UserDetails {
  id: number;
  profilePicture: string;
  location: string;
  jobDetails: string;
  education: string;
  userId: number;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string; // Consider omitting this if not needed
  createdAt: string; // You might want to use a Date type if parsing
  userDetails: UserDetails;
}

export interface Like {
  id: number;
}
export interface Comment {
  id: number;
  comment: string;
  user: User;
}

export interface Post {
  id: number;
  photos: string; // Array of image URLs
  content: string;
  comments:Comment[];
  video:string,
  userId: number;
  likes: Like[]; // Array of Like objects
  user: User; // User object with details
}
