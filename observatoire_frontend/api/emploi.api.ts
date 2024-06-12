export class EmploiApi {
  private static readonly baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  static async getAllEmplois(
    accessToken: string,
    page: number,
    createdAt: string
  ): Promise<{ ok: boolean; data: { emplois?: any[]; message?: string } }> {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(
      `${this.baseUrl}/emploi?page=${
        page + 1
      }&size=${10}&createdAt=${createdAt}`,
      options
    );
    if (response.ok) {
      const emplois = await response.json();
      return { ok: true, data: { emplois } };
    } else {
      const { message } = await response.json();
      return { ok: false, data: { message } };
    }
  }

  static async getEmploiById(
    accessToken: string,
    id: string
  ): Promise<{ ok: boolean; data: { emploi?: any; message?: string } }> {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(`${this.baseUrl}/emploi/${id}`, options);
    if (response.ok) {
      const emploi = await response.json();
      return { ok: true, data: { emploi } };
    } else {
      const { message } = await response.json();
      return { ok: false, data: { message } };
    }
  }

  static async createEmploi(
    accessToken: string,
    createFormulaire: any
  ): Promise<{ ok: boolean; data: { message?: string } }> {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(createFormulaire),
    };
    const response = await fetch(`${this.baseUrl}/emploi`, options);
    if (response.ok) {
      return { ok: true, data: {} };
    } else {
      const { message } = await response.json();
      return { ok: false, data: { message } };
    }
  }

  static async deleteEmploi(accessToken: string, id: number): Promise<{ok: boolean, data: {message?: string}}> {
    const options = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    };
    const response = await fetch(`${this.baseUrl}/emploi/${id}`, options);
    if(response.ok) {
        return {ok: true, data: {}}
    } else {
        const { message } = await response.json();
        return {ok: false, data: {message}};
    }
}
}
