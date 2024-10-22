import AppBar from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";

const Blogs = () => {
  return (
    <>
      <AppBar />
      <div className=" flex justify-center ">
        <div className=" flex justify-center flex-col max-w-2xl">
          <BlogCard
            authorName={"Sarthak Sarangi"}
            title={"Hi first blog"}
            content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eaque, quo veritatis alias repellat quas labore eos molestiae quis autem illo vitae ut libero delectus. Eos odit dolorum ullam libero!
Earum eligendi, vero, numquam iste quos cupiditate quam ut sunt saepe facilis aliquam error enim fugiat magni voluptate obcaecati. Maxime neque id soluta vero ut quod rerum aperiam pariatur ipsum?
Iste quibusdam, aliquam dolorem laudantium quidem modi nesciunt aut voluptates qui sunt ea quod, natus esse corporis necessitatibus reprehenderit odio voluptatibus earum hic quam provident maiores saepe. Alias, eos cupiditate!
Consectetur assumenda repellat cupiditate minus est officiis autem commodi magnam quae reprehenderit, adipisci asperiores, earum animi sit laboriosam molestias ex itaque. Debitis doloremque a quisquam possimus sapiente tenetur, cumque obcaecati?
Reiciendis eligendi inventore et minima adipisci ab. Totam, sed sequi ea libero nam nihil sunt hic quia id eius non doloribus provident amet dignissimos excepturi beatae vitae, animi possimus fugit?
"
            publishedDate={"01/01/01"}
          />
          <BlogCard
            authorName={"Sarthak Sarangi"}
            title={"Hi first blog"}
            content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eaque, quo veritatis alias repellat quas labore eos molestiae quis autem illo vitae ut libero delectus. Eos odit dolorum ullam libero!
Earum eligendi, vero, numquam iste quos cupiditate quam ut sunt saepe facilis aliquam error enim fugiat magni voluptate obcaecati. Maxime neque id soluta vero ut quod rerum aperiam pariatur ipsum?
Iste quibusdam, aliquam dolorem laudantium quidem modi nesciunt aut voluptates qui sunt ea quod, natus esse corporis necessitatibus reprehenderit odio voluptatibus earum hic quam provident maiores saepe. Alias, eos cupiditate!
Consectetur assumenda repellat cupiditate minus est officiis autem commodi magnam quae reprehenderit, adipisci asperiores, earum animi sit laboriosam molestias ex itaque. Debitis doloremque a quisquam possimus sapiente tenetur, cumque obcaecati?
Reiciendis eligendi inventore et minima adipisci ab. Totam, sed sequi ea libero nam nihil sunt hic quia id eius non doloribus provident amet dignissimos excepturi beatae vitae, animi possimus fugit?
"
            publishedDate={"01/01/01"}
          />
        </div>
      </div>
    </>
  );
};

export default Blogs;
