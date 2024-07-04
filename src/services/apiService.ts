import axios, { AxiosInstance, AxiosResponse } from "axios";

const ERRORS: { [index: string]: string } = {
  500: "O servidor não conseguiu processar a requisição, tente novamente mais tarde",
  404: "Item não encontrado",
  400: "Dados inválidos, verifique os dados e tente novamente",
  401: "Você não tem permissão para realizar essa ação",
  0: "Parece que você esta offline, verifique a sua conexão ou VPN e tente novamente",
};

const apiKey = process.env.API_KEY;

const injectApiKey = (endpoint: string) => {
  const separator = endpoint.includes("?") ? "&" : "?";
  const newEndpoint = `${endpoint}${separator}key=${apiKey}`;

  return newEndpoint;
};

export default class ApiService {
  http: AxiosInstance;
  forceMocks: boolean = process.env.FORCE_MOCKS === "true";

  constructor() {
    this.http = axios.create({
      baseURL: process.env.PUBLIC_URL_API,
      headers: {},
    });

    this.http.interceptors.response.use(
      (res) => ({ data: res.data, headers: res.headers } as AxiosResponse),
      (err) => this.handleErrors(err)
    );
  }

  private handleErrors(httpError: any) {
    const status = httpError?.response?.status || "";
    const summary =
      httpError?.response?.data?.message || ERRORS[status] || ERRORS[500];

    return Promise.reject({
      severity: "error",
      summary: summary,
      status: status,
    });
  }

  private async shouldMock(mock: any) {
    if (mock) {
      return new Promise((resolve) => resolve(mock));
    }
    return new Error("PROVIDE A VALID MOCK");
  }

  /**
   * @param {{endpoint: string, mock: any}} param0
   */
  async get({ endpoint, mock }: any): Promise<any> {
    if (this.forceMocks) {
      return this.shouldMock(mock);
    }
    return this.http.get(injectApiKey(endpoint));
  }

  /**
   * @param {{endpoint: string, body: any, mock: any}} param0
   */
  async post({ endpoint, body, mock, config }: any): Promise<any> {
    if (this.forceMocks) {
      return this.shouldMock(mock);
    }
    return this.http.post(injectApiKey(endpoint), body, config);
  }

  /**
   * @param {{endpoint: string, body: any, mock: any}} param0
   */
  async put({ endpoint, body, mock, config }: any): Promise<any> {
    if (this.forceMocks) {
      return this.shouldMock(mock);
    }
    return this.http.put(injectApiKey(endpoint), body, config);
  }

  /**
   * @param {{endpoint: string, mock: any}} param0
   */
  async delete({ endpoint, mock, config }: any): Promise<any> {
    if (this.forceMocks) {
      return this.shouldMock(mock);
    }
    return this.http.delete(injectApiKey(endpoint), config);
  }

  /**
   * @param {{endpoint: string, body: any, mock: any, config?: AxiosRequestConfig<any>}} param0
   */
  async patch({ endpoint, body, mock, config }: any): Promise<any> {
    if (this.forceMocks) {
      return this.shouldMock(mock);
    }
    return this.http.patch(injectApiKey(endpoint), body, config);
  }
}
