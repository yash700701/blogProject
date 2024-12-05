import confi from "../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(confi.appwriteUrl)
        .setProject(confi.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }){
        try {
            const useAccount = await this.account.create( ID.unique(), email, password, name ) 
            if(useAccount){
                return this.login({ email, password })
            }else{
                return useAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error", error);
        }
        return null
    }

    async logout(){
        try {
            await this.account.deleteSessions() 
        } catch (error) {
            console.log("Appwrite Service :: logout :: error", error);
        }
    }
};
 

const authService = new AuthService()
export default authService