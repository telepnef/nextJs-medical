import { useRouter } from "next/navigation";

const LogoutButton = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    cookieStore.delete("currentUser").finally(() => {
      router.push("/");
    });
  };
  return <div onClick={handleLogout}>{children}</div>;
};

export default LogoutButton;
