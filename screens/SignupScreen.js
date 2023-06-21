import useAuth from "../store/authContenxt";

import Loading from "../components/ui/Loading";
import AuthContent from "../components/auth/AuthContent";

const SignupScreen = () => {
  const { loading, signup } = useAuth();
  const handleSubmit = async (data) => signup(data);

  if (loading) return <Loading message="Creating user..." />;

  return <AuthContent onAuthenticate={handleSubmit} />;
};

export default SignupScreen;
