import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import storageService from '../../appwrite/storageService'
import RTE from "../RTE/RTE";
import Input from "../common/Input";
import Select from '../common/Select'

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Aisearch from "../Aisearch/Aisearch";


export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            Title: post?.Title || "",
            slug: post?.$id || "",
            Content: post?.Content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.authReducer.user);
    const [loading, setLoading] = useState(false)

    const submit = async (data) => {
        setLoading(true)
        if (post) {
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null;

            if (file) {
                storageService.deleteFile(post.FeaturedImg);
            }

            const dbPost = await storageService.updatePost(post.$id, {
                ...data,
                FeaturedImg: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
            setLoading(false)
        } else {
            setLoading(true)
            const file = await storageService.uploadFile(data.image[0]);
            const fileId = file.$id;
            data.FeaturedImg = fileId;
            const dbPost = await storageService.createPost({ ...data, userID: userData.$id, dislikeCount: 0, likeCount: 0, username: userData.name });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
            setLoading(false)
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")
                .slice(0, 36)
                ;

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "Title") {
                setValue("slug", slugTransform(value.Title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="md:w-2/3 md:px-2 w-full mb-4 md:mb-0">
                <Input
                    label="Title"
                    placeholder="Title"
                    className="mb-4  text-[#15191d] font-semibold w-full"
                    labelclassName='w-[2.25rem]'
                    {...register("Title", { required: true })}
                />
                <Input
                    label="Slug"
                    placeholder="Slug"
                    className="mb-4 text-[#15191d] font-semibold w-full"
                    labelclassName='w-[2.25rem]'
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="Content" control={control} defaultValue={getValues("Content")} />
            </div>
            <div className="md:w-1/3 md:px-2 formbg pt-4 flex flex-col gap-4 w-full p-2 ">
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Featured Image :</label>
                    <Input
                        label=""
                        type="file"
                        className="border border-white cursor-pointer w-full"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image")}
                    />
                    <span className="w-full text-center">OR</span>
                    <input type="text"
                        placeholder="Image URL"
                        className="p-2 rounded-md text-[#15191d] font-semibold w-full"
                        {...register("imgUrl")}
                    />
                </div>
                {post && (
                    <div className="w-full flex justify-center">
                        <img
                            src={post.imgUrl ? post.imgUrl : storageService.getFilePreview(post.FeaturedImg)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <div className="flex gap-1 md:gap-5 w-full justify-center md:flex-col lg:flex-row">
                    <Select
                        options={["Finance", "Health", "History", "News", "Science", "Society", "Sports", "Entertainment", "Technology"]}
                        label="Category"
                        className='w-1/2'
                        {...register("category", { required: true })}
                    />
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="w-1/2"
                        {...register("status", { required: true })}
                    />
                </div>
                <button type="submit" className=" rounded-md font-semibold p-2 bg-green-400 text-[#15191d]" disabled={loading}>
                    {loading ? <span className="loader"></span> : post ? "Update" : "Submit"}
                </button>
                <hr />
                <Aisearch />
            </div>
        </form>
    );
}