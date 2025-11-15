
export function meta({}) {
  return [
    { title: "facto" },
    { name: "Account", content: "Welcome to facto" },
  ];
}
const Account:React.FC = () => {
  

  return (
    <div className="flex min-h-screen items-center justify-center  w-full">
      <h1>Account</h1>
    </div>
  );
};

export default Account;
