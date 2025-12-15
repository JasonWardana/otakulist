import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '@/libs/prisma';

export const authOption = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          email: user.email,
          name: user.name || 'No Name',
          provider: 'github',
        },
      });
      return true;
    },

    async session({ session }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (dbUser) {
        session.user.id = dbUser.id;
      }

      return session;
    },

    async redirect({ baseUrl }) {
      return baseUrl + '/';
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
