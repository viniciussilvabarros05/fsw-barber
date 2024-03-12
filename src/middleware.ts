import { withAuth } from "next-auth/middleware";

export default withAuth(
  {
    callbacks: {
      authorized: ({ token,req }) => {
        const session:string|undefined = req.cookies.get("next-auth.session-token")?.value;
        return session? true: false;
      },
    },
  }
);

export const config = { matcher: ["/bookings"] };
