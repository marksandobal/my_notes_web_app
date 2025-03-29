export { default } from "next-auth/middleware";

export const config = {
  //matcher: ["/:path*"],
  matcher: ['/notes/:path*'],
};
