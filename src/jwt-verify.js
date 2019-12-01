import jwt from 'jsonwebtoken';
const secret = "merng_assetmgt";

const verifyToken = token =>{
	return jwt.verify(token, secret, function(err, decoded){
		if(err){
			return null;
		} else {
			return decoded;
		}
	})
}

export default verifyToken;