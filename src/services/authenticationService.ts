const BASE_SERVICE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

interface ICredential {
  email: string;
  password: string;
};

interface IRequestBody {
  user: ICredential;
};

interface ILoginResponse {
  id: number;
  userType: number;
  name: string;
  lastName: string;
  email: string;
  token: string;
};

export async function login({ email, password }: ICredential): Promise<ILoginResponse> {
  const requestBody: IRequestBody = {
    user: {
      email: email,
      password: password
    }
  };

  const response = await fetch(`${BASE_SERVICE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }

  const {status: {  data: { user } } } =  await response.json();

  const token = response.headers.get('Authorization') || '';
  const loginResponse: ILoginResponse = {
    id: user.id,
    userType: user.user_type,
    name: user.name,
    lastName: user.last_name,
    email: user.email,
    token: token,
  };

  return loginResponse;
}

export async function logout(token: string) {
  const response = await fetch(`${BASE_SERVICE_URL}/logout`, {
      method: 'DELETE',
      headers: {
        'Authorization': token
      }
  });

  return response;
}

export async function verifyToken(token: string) {
  const response = await fetch(`${BASE_SERVICE_URL}/current_user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });

  return response;
}
