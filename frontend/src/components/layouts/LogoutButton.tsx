import Button from "../elements/Button";
import { useAuth } from "./../../context/auth";

const LogoutButton = () => {
  const { logout } = useAuth();

  const onSubmitButton = async () => {
    await logout()

    console.log("logoutボタンがクリックされました");
  };

  return (
    <Button style="primary" onClick={onSubmitButton}>
      ログアウト
    </Button>
  );
};

export default LogoutButton;