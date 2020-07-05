export const getTokenExpire = (token) => {
    if (!token) return 0;
    try {
        const [ , payload] = token.split('.'); //pega segundo valor

        const data = JSON.parse(atob(payload)); //converte base64    
        const expires = data ? data.exp : 0; //timestamp em segundos

        return expires;
    } catch(err) {
        return 0;
    }
}