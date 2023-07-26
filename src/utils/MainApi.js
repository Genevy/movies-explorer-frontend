class MainApi {
    #url
    #headers
    #authHeaders
    constructor({ baseUrl, headers }) {
        this.#url = baseUrl;
        this.#headers = headers;
        this.#authHeaders = null;
    }
    
    setAuthHeaders = (token) => {
        this.#authHeaders = {
            ...this.#headers,
            authorization: `Bearer ${token}`
        };
    }
    #ckeckOk = (res) => res.ok ? res.json() : Promise.reject(res.status);

    #fetcher(method, path, body, notSave) {
        const reqOptions = {
            method: method,
            headers: notSave ? this.#headers : this.#authHeaders,
        }
        if (body) reqOptions.body = JSON.stringify(body);

        return fetch(`${this.#url}${path}`, reqOptions).then(this.#ckeckOk);
    }

    registerUser = (regData) => this.#fetcher('POST', '/signup', regData, 'notSave');
    
    loginUser = (loginData) => this.#fetcher('POST', '/signin', loginData, 'notSave');
    
    getUserInfo = () => this.#fetcher('GET', '/users/me');

    updateUserInfo = (userData) => this.#fetcher('PATCH', '/users/me', userData);

    getUserMovie = () => this.#fetcher('GET', '/movies');

    saveUserMovie = (movieData) => this.#fetcher('POST', '/movies', movieData);

    deleteMovie = (id) => this.#fetcher('DELETE', `/movies/${id}`);

}

const mainApi = new MainApi({
    baseUrl: 'https://api.movies.genevy.nomoreparties.sbs',
    // baseUrl: 'http://localhost:3333',
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    }
  })

export default mainApi;
