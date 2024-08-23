import { useAppSelector } from "../../store/hook";

const HeaderDefault = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="p-4 w-full flex items-center justify-between">
      <h1 className="text-2xl font-bold">XO</h1>
      <div className="flex gap-4 items-center">
        <span>{user.name}</span>
      </div>
    </div>
  );
};

export default HeaderDefault;
