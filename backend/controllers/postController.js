const { isAuthenticated } = require("../middlewares/auth");  // Assuming you have the auth middleware

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Ensure that the user is the post owner or an admin
    if (post.email !== req.user.email && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this post' });
    }

    // If the post is found and the user is authorized, delete the post
    await post.remove();

    res.status(200).json({ success: true, message: 'Post deleted successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
