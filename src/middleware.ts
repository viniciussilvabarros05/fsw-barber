// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   {
//     callbacks: {
//       authorized: ({ token,req }) => {
//         const session:string|undefined = req.cookies.get(process.env.NEXTAUTH_COOKIE as string)?.value;
//         return session? true: false;
//       },
//     },
//   }
// );

// export const config = { matcher: ["/bookings"] };
