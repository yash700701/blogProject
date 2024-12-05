import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/configuration";
import Bttn from "./Bttn";
import Container from "./container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";


function PostPage() {
    console.log("entered into post page");
    
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getpost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="my-10 bg-slate-200 rounded-xl p-5 mx-5">
            <Container>
                <div className="w-full bg-slate-900 flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-0 top-12">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Bttn text="edit" bgColor="bg-green-500" className="mr-3">
                                    
                                </Bttn>
                            </Link>
                            <Bttn text="delete" bgColor="bg-red-500" onClick={deletePost}>
                                
                            </Bttn>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 text-teal-900">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css text-zinc-800">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default PostPage