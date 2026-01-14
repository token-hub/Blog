import Blogs from "./blogs";

const blogs = [
    {
        id: "1",
        title: "I am a title",
        date: "December 21, 2021",
        blog: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae harum in explicabo asperiores unde necessitatibus laborum nihil? Cumque fuga minima consectetur, impedit laudantium, officiis consequuntur suscipit facilis expedita pariatur alias? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae harum in explicabo asperiores unde necessitatibus laborum nihil? Cumque fuga minima consectetur, impedit laudantium, officiis consequuntur suscipit facilis expedita pariatur alias?",
    },
    {
        id: "2",
        title: "I am a title",
        date: "December 21, 2021",
        blog: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae harum in explicabo asperiores unde necessitatibus laborum nihil? Cumque fuga minima consectetur, impedit laudantium, officiis consequuntur suscipit facilis expedita pariatur alias? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae harum in explicabo asperiores unde necessitatibus laborum nihil? Cumque fuga minima consectetur, impedit laudantium, officiis consequuntur suscipit facilis expedita pariatur alias?",
    },
];

const MyBlogs = () => {
    return (
        <div className="wrapper">
            <div className="flex items-center justify-center flex-col">
                {blogs.length > 0 ? <Blogs blogs={blogs} /> : <div className="text-2xl mt-6">Login and create your own blogs :D </div>}
            </div>
        </div>
    );
};

export default MyBlogs;
