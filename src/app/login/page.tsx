import { Suspense } from "react";
import LoginForm from "@/components/login/Form";

const Login = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

export default Login;
