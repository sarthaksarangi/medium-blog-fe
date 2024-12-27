const BlogContent = ({ content }: { content: any }) => {
  return (
    <div>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default BlogContent;
