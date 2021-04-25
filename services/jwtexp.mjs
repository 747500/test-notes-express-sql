
const logout = {}

setInterval(() => {

	const expSeconds = parseInt(process.env.JWT_EXPIRES, 10)

	for (let item in logout) {
		let time2clean = 1000 * (logout[item] + expSeconds)
		if (Date.now() > time2clean) {
			delete logout[item]
		}
	}

}, 60 * 1000)

const add = (token) => {

	logout[token.id] = Date.now() / 1000

}

const isExpired = (token) => {
	const stored = logout[token.id]

	if (null == stored) { // ==
		return false
	}

	if (stored < token.iat) {
		return false
	}

	return true
}

function JwtExp () {

	return { add, isExpired }
}

const jwtexp = JwtExp()

export {
	jwtexp
}
