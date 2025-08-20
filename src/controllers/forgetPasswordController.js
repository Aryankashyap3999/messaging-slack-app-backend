import crypto from "crypto";

import { addEmailtoMailQueue } from "../producers/mailQueueProducer.js";
import User from "../schema/user.js";
import { resetPasswordMail } from "../utils/common/mailObject.js";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log('Email is: ', email);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Save token + expiry
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min expiry
    await user.save();

    // Send email with reset link
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    addEmailtoMailQueue({
      ...resetPasswordMail(resetUrl),
      to: user.email
    })

    res.json({ msg: "Reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

