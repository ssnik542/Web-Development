import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
    client = new Client();
    account;



    constructor() {
        this.client.setEndpoint(config.APPWRITE_URL).setProject(config.APPWRITE_PROJECT_ID);
        this.account = new Account(this.client)

    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) return this.login({ email, password });
            return userAccount

        } catch (error) {
            console.log('Error:', error);
            return false
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailSession(email, password)
            return session;
        } catch (error) {
            return false;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error)
        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log(error)
        }
    }
}

const authService = new AuthService();

export default authService;