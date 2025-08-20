import User from "../schema/user.js";

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  console.log('reset password is: ', password);

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }, // valid token
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
