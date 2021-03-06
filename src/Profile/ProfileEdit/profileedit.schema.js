import * as yup from 'yup';
import { UserService } from '../../services/user.service';
import environment from '../../environments/index';
export const profileedit = yup.object().shape({
	username: yup.string()
		.min(2, 'Username is too short')
		.max(16, 'Username is too long')
		.required('Username is required')
		.test('isUnique', 'Username is already taken', (value) => isUsernameUnique(value)),
	email: yup.string()
		.email('Email is invalid')
		.required('Email is required')
		.test('isUnique', 'Email is in use', (value) => isEmailUnique(value)),
	password: yup.string()
		.min(6, 'Password is too short')
		.max(16, 'Password is too long'),
		// .required('Password is required')
        bio: yup.string()
        .max(150,'bio is too long, max 150')
});

// const memo = {
// 	email: {},
// 	username: {}
// };

// async function isUnique(field,value) {
//     let LoggedInUserName=await UserService.me();
//     console.log(LoggedInUserName)
//     if (LoggedInUserName.username===value) 
//     {
//         return true
//     }
//     let LoggedInEmail = await UserService.getUserData(LoggedInUserName.username)
//     if (LoggedInEmail.email===value){
//         return true
//     }
//         if (memo[field].hasOwnProperty(value)) {
//             return memo[field][value];
//         }
//         fetch(environment.apiUrl+`/user/check?${field}=${value}`)
//             .then(res => res.json())
//             .then(res => {
//                 memo[field][value] = !res;
//                 return memo[field][value];
//             })
//         }

        async function isUsernameUnique(value){
			const user = await UserService.me();
            const userData = await UserService.getUserData(user.username)
            const result = await UserService.checkUsername(value,userData.username)
            return result
        }
        
        async function isEmailUnique(value){
			const user = await UserService.me();
            const userData = await UserService.getUserData(user.username)
            const result = await UserService.checkEmail(value,userData.email)
            return result
        }