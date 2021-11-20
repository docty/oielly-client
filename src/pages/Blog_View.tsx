import Intro from '../components/Intro';
import blog3 from '../assets/images/blog/single/1.jpg';
import { Image, Cage, Grid, Heading, Paragraph, Flexbox, SearchField } from '@docty68/widget';
import { Link, useParams } from 'react-router-dom';
import { Box } from '../components/Box';
import blog2 from "../assets/images/blog/1_xs.jpg";
import oielly from '@docty68/oielly-gateway';
import { useState, useEffect } from 'react';
import { IBlog } from './Blog';

const Blog_View = () => {
    const [blog, setBlog] = useState<IBlog>({} as IBlog);
    const params = useParams<{referenceId: string}>();
    useEffect(() => {
        oielly.blog.profile({
            postId: params.referenceId,
            response: (success, error) => {
                if (error) { return }
                setBlog(success.message);
            }
        }) 
    }, [params.referenceId])
    return (
        <Cage className="main">
            <Intro name={'Blog Details'} />
            <Grid md={'3'} className="my-6 mx-4 sm:mx-4 lg:mx-32 mt-5" gap={'5'}>
                <Cage className="col-span-2">
                    <Image source={blog3} width="880" height="450" alt="post" />
                    <Paragraph text={"Jun 22, 2020 | 2 Comments"} className={'mt-6 mb-3 text-gray-500'} />
                    <Heading type={"H3"} text={blog.title} className={'font-bold text-xl mb-3'} />
                    <p
                        
                    >{
                        blog.content &&  blog.content.replace(/^<p>&nbsp;|<\/p>/ig, "")
                    }</p> 


                </Cage>
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

            </Grid>


        </Cage>

    )
}

export default Blog_View