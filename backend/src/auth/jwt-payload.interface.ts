export interface JwtPayload {
  username: string;
  sub: number; // The 'sub' property typically contains the user ID
  role: string; // Add any additional properties as needed
}
