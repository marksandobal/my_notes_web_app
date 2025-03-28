//import { camelToSnakeCase } from '../app/utils/formatters';
const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

interface IFetchOptions extends RequestInit {
  headers?: HeadersInit;
}

interface IFetchWithTokenParams {
  token: string;
  endpoint: string;
  options?: IFetchOptions;
};

interface IHandleRequestParams {
  token: string;
  urlEndpoint: string;
  method: string;
  data?: any | null;
  params?: any | null;
  structure?: any | null,
};

interface IGetResourceParams {
  token: string;
  endpoint: string;
  params: any | null;
};

interface ISaveResourceParams {
  token: string;
  endpoint: string;
  data: any;
  structureData: string;
};

interface IDeleteResourceParams {
  token: string;
  endpoint: string;
};

const fetchWithToken = async ({token, endpoint, options = {}}: IFetchWithTokenParams): Promise<any> => {
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}/api/${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Manejo de errores
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error en la solicitud');
  }

  return response.json();
};

const handleRequest = async(requestParams: IHandleRequestParams): Promise<any>=> {
  const { token, urlEndpoint, method, data = null, params = null, structure = null } = requestParams;
  let queryParams = '';

  if (params) {
    queryParams = new URLSearchParams(params).toString();
  }

  const endpoint = `${urlEndpoint}${queryParams ? `?${queryParams}` : ''}`;
  const options = {
    method,
    body: ''
  };

  if (data) {
    options.body = JSON.stringify({ [structure]: data});
  }

  const response = await fetchWithToken({token, endpoint, options});
  return response;
};

export const getResource = ({ token, endpoint, params = null}: IGetResourceParams) => {
  const requestParams = {
    token,
    urlEndpoint: endpoint,
    method: 'GET',
    params
  };

  return handleRequest(requestParams);
};

export const saveResource = ({ token, endpoint, data, structureData }: ISaveResourceParams) => {
  const requestParams = {
    token,
    data,
    urlEndpoint: endpoint,
    method: 'POST',
    structrure: structureData,
  };

  return handleRequest(requestParams);
};

export const updateResource = ({ token, endpoint, data, structureData }: ISaveResourceParams) => {
  const requestParams = {
    token,
    data,
    urlEndpoint: endpoint,
    method: 'PUT',
    structrure: structureData,
  };

  return handleRequest(requestParams);
};

export const deleteResource = ({ token, endpoint }: IDeleteResourceParams) => {
  const requestParams = {
    token,
    urlEndpoint: endpoint,
    method: 'DELETE'
  };
  return handleRequest(requestParams);
};
