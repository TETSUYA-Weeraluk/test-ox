import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const setToken = (credentialResponse: CredentialResponse) => {
    if (credentialResponse?.credential) {
      localStorage.setItem("token-xo", credentialResponse?.credential);
      window.location.href = "/";
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-neutral-800">
      <div className="border border-white p-4 rounded flex flex-col gap-4">
        <h1 className="text-xl text-white text-center">Login</h1>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            setToken(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
};

export default Login;
