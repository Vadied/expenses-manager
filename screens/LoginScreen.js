import AuthContent from "../components/auth/AuthContent";
import Loading from "../components/ui/Loading";
import useAuth from "../store/authContenxt";

const LoginScreen = () => {
  const { token, loading, login } = useAuth();

  const message = token ? "Logging you in..." : "Logout....";
  if (loading) return <Loading message={message} />;

  return <AuthContent isLogin onAuthenticate={login} />;
};

export default LoginScreen;
