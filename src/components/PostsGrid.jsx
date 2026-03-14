import { FixedSizeGrid as Grid } from "react-window";
import Card from "../components/Card";

export default function PostsGrid({
  posts,
  handleDeletePost,
  handleUpdatePost,
}) {
  const screenWidth = window.innerWidth;
  let columns = screenWidth >= 1024 ? 4 : screenWidth >= 768 ? 2 : 1;
  const columnWidth = Math.floor(screenWidth / columns);

  return (
    <Grid
      columnCount={columns}
      columnWidth={columnWidth}
      width={columnWidth * columns}
      rowCount={Math.ceil(posts.length / columns)}
      rowHeight={500}
      height={800}
    >
      {({ columnIndex, rowIndex, style }) => {
        const itemIndex = rowIndex * columns + columnIndex;
        if (itemIndex >= posts.length) return null;

        return (
          <div style={style} className="p-3">
            <Card
              key={posts[itemIndex].id}
              post={posts[itemIndex]}
              handleDeletePost={handleDeletePost}
              handleUpdatePost={handleUpdatePost}
            />
          </div>
        );
      }}
    </Grid>
  );
}
