// /app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/services/authenticationService';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',  // Le damos un nombre al proveedor
      credentials: {
        email: { label: 'Usuario', type: 'email', placeholder: 'user@mail.com' },
        password: { label: 'Contraseña', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          const user = await login(credentials);

          const userData = {
            id: user.id,
            fullName: `${user?.name} ${user?.lastName}`,
            email: user.email,
            token: user.token
          };

          return userData;
        } catch (error) {
          console.error('Error de autenticación:', error);
          return null;
        }
      }
    })
  ],
  // session: {
  //   strategy: 'jwt',  // Utilizamos JWT para la sesión
  // },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    }
  },
  pages: {
    signIn: "/login",
  }
});

export { handler as GET, handler as POST };
