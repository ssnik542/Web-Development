import { Client, Databases, Storage, Query, ID } from "appwrite";
import config from "../config/config";


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(config.APPWRITE_URL).setProject(config.APPWRITE_PROJECT_ID);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ Title, slug, Content, FeaturedImg, status, userID, dislikeCount, likeCount, username, imgUrl, category }) {
        try {
            return await this.databases.createDocument(config.APPWRITE_DB_ID, config.APPWRITE_COLLECTION_ID, slug, {
                Title, Content, FeaturedImg, status, userID, dislikeCount, likeCount, username, imgUrl, category
            })
        } catch (error) {
            console.log(error)
        }
    }

    async updatePost(slug, { Title, Content, FeaturedImg, status, dislikeCount, likeCount }) {
        try {
            return await this.databases.updateDocument(config.APPWRITE_DB_ID, config.APPWRITE_COLLECTION_ID, slug, {
                Title, Content, FeaturedImg, status, dislikeCount, likeCount
            })
        } catch (error) {
            console.log(error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(config.APPWRITE_DB_ID, config.APPWRITE_COLLECTION_ID, slug)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(config.APPWRITE_DB_ID, config.APPWRITE_COLLECTION_ID, slug)
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getAllPosts(quries) {
        try {
            return await this.databases.listDocuments(config.APPWRITE_DB_ID, config.APPWRITE_COLLECTION_ID, quries)
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(config.APPWRITE_BUCKET_ID, ID.unique(), file)
        } catch (error) {
            // console.log(error)
            return false
        }
    }

    async deleteFile(fildId) {
        try {
            await this.bucket.deleteFile(config.APPWRITE_BUCKET_ID, fildId);
            return true;
        } catch (error) {
            console.log(error)
        }
    }

    getFilePreview(fildId) {
        return this.bucket.getFilePreview(config.APPWRITE_BUCKET_ID, fildId)
    }
}

const storageService = new Service()
export default storageService;