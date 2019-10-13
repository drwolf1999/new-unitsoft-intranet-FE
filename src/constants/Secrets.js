// import '../assets/crypto/rollups/hmac-sha256.js';
// import '../assets/crypto/components/enc-base64.js';
//
// const secretKey = 'BPslitCVkevqUYNCTtTFxAmUJdEZq0pak8MNzzZ0';
// const serviceId = 'ncp:sms:kr:256832421523:kakaoserviceintranet';
// const xNcpIamAccessKey = 'kHInBGuA8bU2nEMwQbhY';
// const xNcpApigwSignatureV2 = 'BPslitCVkevqUYNCTtTFxAmUJdEZq0pak8MNzzZ0';
// export default {
//     secretKey: secretKey,
//     serviceId: serviceId,
//     xNcpIamAccessKey: xNcpIamAccessKey,
//     xNcpApigwSignatureV2() {
//         return xNcpApigwSignatureV2;
//         // let space = ' ';
//         // let newLine = '\n';				// new line
//         // let method = 'POST';				// method
//         // let url = '/message';	// url (include query string)
//         // let timestamp = new Date(Date.now());			// current timestamp (epoch)
//         // let accessKey = this.xNcpIamAccessKey;			// access key id (from portal or Sub Account)
//         // let secretKey = xNcpApigwSignatureV2;			// secret key (from portal or Sub Account)
//         // let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
//         // hmac.update(method);
//         // hmac.update(space);
//         // hmac.update(url);
//         // hmac.update(newLine);
//         // hmac.update(timestamp);
//         // hmac.update(newLine);
//         // hmac.update(accessKey);
//         //
//         // let hash = hmac.finalize();
//         //
//         // return hash.toString(CryptoJS.enc.Base64);
//     },
// };