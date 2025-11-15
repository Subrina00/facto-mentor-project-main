export function meta() {
  return [
    { title: "Login" },
    { name: "Login", content: "Welcome to facto" },
  ];
}
const Login:React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center  w-full">
      <h1>Login</h1>
    </div>
  );
};

export default Login;
