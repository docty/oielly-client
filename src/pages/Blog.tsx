import Intro from "../components/Intro";
import blog1 from "../assets/images/blog/list/1.jpg";
import blog2 from "../assets/images/blog/1_xs.jpg";
import { Link } from "react-router-dom";
import {
    Cage,
    Grid,
    SearchField,
    Heading,
    Flexbox,
    Paragraph,
    Image,
} from "@synevix/react-widget";
import { Box } from "../components/Box";
import { Children, useEffect, useState } from 'react';
import oielly from "@synevix/oielly-gateway";

const Blog = () => {
    const [blog, setBlog] = useState<IBlog[]>([]);
    document.cookie  = "tagname = test;secure"
    useEffect(() => {
        oielly.blog.list({
            response: (success, error) => {
                if (error) { return }
                setBlog(success.message);
                console.log(blog)
            }
        })
    }, [blog])
    return (
        <Cage className="mb-12">
            <Intro name={"Blog"} />
            <Grid className={"mx-4 sm:mx-4 lg:mx-32 mt-5"} md={"3"} gap={"5"}>
                <Cage>
                    <SearchField placeholder={"Search in blog"} />
                    <Heading
                        type={"H3"}
                        text={"Blog Categories"}
                        className={"font-bold text-xl my-6"}
                    />
                    <Flexbox gap={"3"} className={'my-6'}>
                        <Box
                            className={
                                "px-2 py-2 flex-1 text-center hover:bg-black hover:text-white"
                            }
                        >
                            <Link to={"/blog/gtp"}>GTP</Link>
                        </Box>
                        <Box
                            className={
                                "px-2 py-2 flex-1 text-center  hover:bg-black hover:text-white"
                            }
                        >
                            <Link to={"/material/woodin"}>Woodin</Link>
                        </Box>
                        <Box
                            className={
                                "px-2 py-2 flex-1 text-center  hover:bg-black hover:text-white"
                            }
                        >
                            <Link to={"/material/holland"}>Holland </Link>
                        </Box>
                    </Flexbox>
                    <Heading
                        type={"H3"}
                        text={"Popular Posts"}
                        className={"font-bold text-xl my-6"}
                    />
                    <Flexbox gap={'5'}>
                        <Image source={blog2} width="90" height="90" alt="post" />
                        <Cage>
                            <Paragraph text={"Nov 22, 2020"} className={'text-gray-500'} />
                            <Paragraph text={"Match our new outfit"} className={'font-bold'} />
                        </Cage>
                    </Flexbox>
                </Cage>
				{
                    blog && Children.toArray(blog.map((item) => (
                        <Cage>
                            <Link to={"/blog/"+item.id}>
                                <Image source={blog1} width="355" height="250" alt="post" />
                            </Link>
                            <Cage>
                                <Paragraph text={"Jun 22, 2020 | 2 Comments"} className={'text-gray-500'} />
                                <Heading type={"H3"} text={item.title} className={'font-bold text-xl my-1'} />
                                <p className={'text-gray-500 my-1 h-16 overflow-hidden overflow-ellipsis'}>
								{
									item.content.replace(/^<p>&nbsp;|<\/p>/ig, "")
                                }</p>
                                <Link
                                    to={"/blog/"+item.id}
                                    className="bg-blue-500 text-white p-2 rounded inline-block my-1"
                                >
                                    Read more
                                </Link>
                            </Cage>
                        </Cage>
                    )))
                }
                


            </Grid>
        </Cage>
    );
};

export interface IBlog  {
	id: number;
	title: string;
	content: string;
}
export default Blog;
