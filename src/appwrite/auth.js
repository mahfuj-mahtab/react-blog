import {Client,Account,ID} from 'appwrite'
import conf from '../conf/conf/'
export class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl) // Your API Endpoint
        .setProject(conf.appWriteProjectId); // Your project ID
        this.account  = new Account(this.client);
//         const promise = this.account.create(ID,'email@example.com', 'sd');

// promise.then(function (response) {
//     console.log(response); // Success
//     console.log('success'); // Success
// }, function (error) {
//     console.log(error); // Failure
//     console.log('fail'); // Success
// });

// const promise = this.account.createEmailSession('mohot1@gmail.com', 'mohot66468');

// promise.then(function (response) {
//     console.log('success'); // Success
// }, function (error) {
//     console.log('fail'); // Failure
// });
    }
    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                return this.login({email,password})
            }
            else{
                return userAccount
            }
        } catch (error) {
            throw error
            
        }
    }

    async login({email,password}){
        try {
            const userLogin = await this.account.createEmailSession(email,password)
            return userLogin
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
           return await this.account.get()
        } catch (error) {
            console.log('error');
        }
        return null
    }


    async logOut(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService()
export default authService