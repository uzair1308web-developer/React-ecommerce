
const BlogItem = () => {
  return (
    <div className='blogItem'>
        <div className="imgWrapper">
            <img src="/assets/images/blog-1.webp" alt="" className="w-full object-cover" />
        </div>
        <div className="blogInfo p-4 shadow-lg">
            <h4 className="blogTitle text-lg font-semibold text-zinc-700">The Best Way to Make a Cup of Coffee</h4>
            <p className="blogDesc text-sm text-zinc-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500">By Admin</span>
                <span className="text-xs text-zinc-500">May 20, 2021</span>
            </div>
        </div>
    </div>
  )
}

export default BlogItem
