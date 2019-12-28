const admin = {
    email: 'godofredo@gmail.com',
    password: '12345678'
}

let isLoged = false

module.exports = {
    async signIn(req, res) {
        const {email, password} = req.body

        if(email !== admin.email || password !== admin.password) {
            return res.json({ errorMsg: 'That was an invalid email address or password.'})
        } else {
            isLoged = true
            res.json(isLoged)
        }
    },

    async signOut(req, res) {
        const {signout} = req.body

        if(signout) {
            isLoged = false
        } 
        return res.json(isLoged)
    },

}