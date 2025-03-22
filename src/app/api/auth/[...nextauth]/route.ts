// /app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
//import { login } from '@/services/authenticationService';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',  // Le damos un nombre al proveedor
      credentials: {
        email: { label: 'Usuario', type: 'email', placeholder: 'text@mail.com' },
        password: { label: 'Contraseña', type: 'password' }
      },
      async authorize(credentials, req) {
        // Aquí validas las credenciales del usuario (por ejemplo, haciendo una consulta a una base de datos)
        const { email, password } = credentials;

        try {
/*           const response = await login(email, password);
          const res = await response.json();
          const { data } = res;
          const token = response.headers.get('Authorization');
          const userData = { id: data.id, fullName: `${data?.name} ${data?.last_name}`, email: data.email, token };

          return userData; */
          return { id: 1, fullName: 'User Example', email: email, token: ''};
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
    signIn: '/auth/login',  // Redirige a una página personalizada de inicio de sesión
  }
});

export { handler as GET, handler as POST };
