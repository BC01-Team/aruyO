import Button from "../elements/Button";

const LogoutButton = () => {
  const onSubmitButton = () => {
    // 認証周りが整備できたら処理を書く
    console.log("logoutボタンがクリックされました");
  };

  return (
    <Button onClick={onSubmitButton}>ログアウト</Button>
  );
};

export default LogoutButton;