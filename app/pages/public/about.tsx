export function meta({}) {
  return [{ title: "About" }, { name: "About", content: "Welcome to facto" }];
}
const About: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center  w-full">
      <h1>About</h1>
    </div>
  );
};

export default About;
