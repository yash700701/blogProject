import React, {useCallback} from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Bttn from './Bttn'
import Input from './Input'
import Select from './Select'
import RTE from './RTE'
import service from '../appwrite/configuration'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'




function PostForm({ post }) {
  const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
  })

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  if(userData){
    localStorage.setItem("userId", `${userData.$id}`);
    localStorage.setItem("userName", `${userData.name}`);
    console.log( localStorage.getItem("userId"));
  }
  
  const submit = async (data) => {
    console.log(`submit function called under create post data: ${JSON.stringify(data)}`);
    
    if (post) {
        console.log("update post - if condition");
        const file = data.image[0] ? await service.uploadFile(data.image[0]) : null; //give file id

        if (file) {
            service.deleteFile(post.featuredImage);
        }

        const dbPost = await service.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
        }
    } else {
        console.log("new post - else condition");
        const file = await service.uploadFile(data.image[0]); //return $id
   
        if (file) {
            console.log(`file ${JSON.stringify(file)}`);  
            data.featuredImage = file.$id;
        }
        data.userId = localStorage.getItem("userId");
        data.name = localStorage.getItem("userName");
        const now = new Date();
        const dateString = now.toString();
        const trimmedString = dateString.substring(0, dateString.indexOf("2024") + 4);
        data.date = trimmedString
        data.likeCount = 0;
            
        const dbPost = await service.createPost(data);
        console.log(`new data ${JSON.stringify(data)}`);

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
        }
    }
  };

  const slugTransform = useCallback((value) => {
      if (value && typeof value === "string")
          return value
              .trim()
              .toLowerCase()
              .replace(/[^a-zA-Z\d\s]+/g, "-")
              .replace(/\s/g, "-");

      return "";
  }, []);

  useEffect(() => {
      const subscription = watch((value, { name }) => {
          if (name === "title") {
              setValue("slug", slugTransform(value.title), { shouldValidate: true });
          }
      });

      return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);


  return (
    <form onSubmit={handleSubmit(submit)} className="grid sm:grid-cols-2 gap-10 mb-10 mt-20  rounded-xl text-teal-100 p-5 ">
    <div className="w-full px-2">
        <Input
            label=" "
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label=""
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-full px-2 py-6">
        <Input
            label=""
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label=""
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Bttn text={`${post ? "Update" : "Submit"}`} type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            
        </Bttn>
    </div>
  </form>
  )
}

export default PostForm