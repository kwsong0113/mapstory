import { BodyT, fetchy } from "@/utils/fetchy";

type UserRequest = {
  username: string;
  password: string;
};

export const createUser = async (body: UserRequest) => {
  await fetchy("/api/users", "POST", {
    body,
  });
};

export const loginUser = async (body: UserRequest) => {
  await fetchy("/api/login", "POST", {
    body,
  });
};

export const fetchSession = async () => {
  const { username } = await fetchy("/api/session", "GET", { alert: false });
  return username as string;
};

export const logoutUser = async () => {
  await fetchy("/api/logout", "POST");
};

export const updateUser = async (patch: BodyT) => {
  await fetchy("/api/users", "PATCH", { body: { update: patch } });
};

export const deleteUser = async () => {
  await fetchy("/api/users", "DELETE");
};
