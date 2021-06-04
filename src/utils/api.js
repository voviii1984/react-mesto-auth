class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _makeRequest(Url, param = {
        headers: this._headers,
    }) {
        return fetch(`${this._baseUrl}${Url}`, param)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    userInfo() {
        return this._makeRequest("users/me")
    }

    getInitialCards() {
        return this._makeRequest("cards")
    }

    getProfile(data) {
        return this._makeRequest("users/me", {
            method: 'PATCH',
            headers: this._headers,

            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })

    }

    getNewCard(data) {
        return this._makeRequest("cards", {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
    }

    deleteCard(id) {
        return this._makeRequest(`cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    changeLikeCardStatus(id, isLiked) {
        return this._makeRequest(`cards/likes/${id}`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers,
        })
    }

    /*putLike(id) {
        return this._makeRequest(`cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers,
        })
    }

    deleteLike(id) {
        return this._makeRequest(`cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }*/

    putAvatar(data) {
        return this._makeRequest("users/me/avatar", {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21/',
    headers: {
        authorization: '6ce8c48d-6e8a-4e63-a71a-59f4fb098162',
        'Content-Type': 'application/json'
    }
})

export default api;